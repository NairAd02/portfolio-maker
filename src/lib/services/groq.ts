"use server";

import OpenAI from "openai";
import {
  GroqChatCompletionRequest,
  GroqChatCompletionResponse,
  GroqServiceResponse,
  GroqModel,
  GroqChatMessage,
} from "../types/groq";

let groqClient: OpenAI | null = null;

function getGroqClient(): OpenAI {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GROQ_API_KEY no está configurada en las variables de entorno"
      );
    }

    groqClient = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  return groqClient;
}

export async function createChatCompletion(
  request: GroqChatCompletionRequest
): Promise<GroqServiceResponse<GroqChatCompletionResponse>> {
  try {
    const client = getGroqClient();

    const completion = await client.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens,
      top_p: request.top_p ?? 1,
      stream: false,
      stop: request.stop,
    });

    const response: GroqChatCompletionResponse = {
      id: completion.id,
      object: completion.object,
      created: completion.created,
      model: completion.model,
      choices: completion.choices.map((choice) => ({
        index: choice.index,
        message: {
          role: choice.message.role as "system" | "user" | "assistant",
          content: choice.message.content || "",
        },
        finish_reason: choice.finish_reason || "",
      })),
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens || 0,
        completion_tokens: completion.usage?.completion_tokens || 0,
        total_tokens: completion.usage?.total_tokens || 0,
      },
    };

    return { data: response, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return {
      data: null,
      error: {
        name: "GroqAPIError",
        reason: errorMessage,
        code: "GROQ_ERROR",
      },
    };
  }
}

export async function* createChatCompletionStream(
  request: GroqChatCompletionRequest
): AsyncGenerator<string, void, unknown> {
  try {
    const client = getGroqClient();

    const stream = await client.chat.completions.create({
      model: request.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens,
      top_p: request.top_p ?? 1,
      stream: true,
      stop: request.stop,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    throw new Error(`Error en streaming de Groq: ${errorMessage}`);
  }
}

export async function generateText(
  prompt: string,
  model: GroqModel = "llama-3.3-70b-versatile",
  options?: {
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<GroqServiceResponse<string>> {
  const messages: GroqChatMessage[] = [];

  if (options?.systemPrompt) {
    messages.push({
      role: "system",
      content: options.systemPrompt,
    });
  }

  messages.push({
    role: "user",
    content: prompt,
  });

  const result = await createChatCompletion({
    model,
    messages,
    temperature: options?.temperature,
    max_tokens: options?.maxTokens,
  });

  if (result.error) {
    return { data: null, error: result.error };
  }

  const content = result.data?.choices[0]?.message?.content || "";
  return { data: content, error: null };
}

export async function chat(
  messages: GroqChatMessage[],
  model: GroqModel = "llama-3.3-70b-versatile",
  options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<GroqServiceResponse<GroqChatMessage>> {
  const result = await createChatCompletion({
    model,
    messages,
    temperature: options?.temperature,
    max_tokens: options?.maxTokens,
  });

  if (result.error) {
    return { data: null, error: result.error };
  }

  const assistantMessage = result.data?.choices[0]?.message;
  if (!assistantMessage) {
    return {
      data: null,
      error: {
        name: "NoResponseError",
        reason: "No se recibió respuesta del modelo",
        code: "NO_RESPONSE",
      },
    };
  }

  return { data: assistantMessage, error: null };
}

export function getAvailableModels(): GroqModel[] {
  return [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
    "gemma2-9b-it",
    "gemma-7b-it",
  ];
}
