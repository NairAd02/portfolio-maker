"use server";

import {
  generateText,
  chat,
  createChatCompletion,
  createChatCompletionStream,
  getAvailableModels,
} from "./groq";
import { GroqChatMessage } from "../types/groq";

export async function exampleGenerateText() {
  const result = await generateText(
    "Explica qué es un portfolio profesional en 2 párrafos",
    "llama-3.3-70b-versatile",
    {
      systemPrompt: "Eres un asistente experto en desarrollo profesional.",
      temperature: 0.7,
      maxTokens: 500,
    }
  );

  if (result.error) {
    console.error("Error:", result.error);
    return null;
  }

  return result.data;
}

export async function exampleChatConversation() {
  const messages: GroqChatMessage[] = [
    {
      role: "system",
      content: "Eres un asistente útil que ayuda con portfolios profesionales.",
    },
    {
      role: "user",
      content: "¿Qué secciones debería incluir en mi portfolio de desarrollador?",
    },
  ];

  const result = await chat(messages, "llama-3.3-70b-versatile", {
    temperature: 0.8,
    maxTokens: 1000,
  });

  if (result.error) {
    console.error("Error:", result.error);
    return null;
  }

  return result.data;
}

export async function exampleFullChatCompletion() {
  const result = await createChatCompletion({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Eres un experto en tecnología.",
      },
      {
        role: "user",
        content: "Lista 5 tecnologías modernas para desarrollo web",
      },
    ],
    temperature: 0.5,
    max_tokens: 300,
  });

  if (result.error) {
    console.error("Error:", result.error);
    return null;
  }

  return result.data;
}

export async function exampleStreamingResponse() {
  const stream = createChatCompletionStream({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: "Escribe un breve poema sobre la programación",
      },
    ],
    temperature: 0.9,
    max_tokens: 200,
  });

  let fullResponse = "";

  try {
    for await (const chunk of stream) {
      fullResponse += chunk;
      console.log(chunk);
    }
    return fullResponse;
  } catch (error) {
    console.error("Error en streaming:", error);
    return null;
  }
}

export async function exampleListModels() {
  const models = getAvailableModels();
  console.log("Modelos disponibles:", models);
  return models;
}

export async function exampleGenerateBlogContent(topic: string) {
  const result = await generateText(
    `Escribe una introducción para un artículo de blog sobre: ${topic}`,
    "llama-3.3-70b-versatile",
    {
      systemPrompt:
        "Eres un escritor profesional especializado en contenido técnico.",
      temperature: 0.7,
      maxTokens: 500,
    }
  );

  if (result.error) {
    throw new Error(`Error generando contenido: ${result.error.reason}`);
  }

  return result.data;
}

export async function exampleGenerateProjectDescription(
  projectName: string,
  technologies: string[]
) {
  const techList = technologies.join(", ");

  const result = await generateText(
    `Genera una descripción profesional para un proyecto llamado "${projectName}" que usa las siguientes tecnologías: ${techList}`,
    "llama-3.3-70b-versatile",
    {
      systemPrompt:
        "Eres un experto en redacción de portfolios profesionales de desarrolladores.",
      temperature: 0.6,
      maxTokens: 300,
    }
  );

  if (result.error) {
    return {
      data: null,
      error: result.error,
    };
  }

  return {
    data: result.data,
    error: null,
  };
}

export async function exampleImproveText(originalText: string) {
  const messages: GroqChatMessage[] = [
    {
      role: "system",
      content:
        "Eres un editor profesional. Mejora el texto manteniendo su significado pero haciéndolo más profesional y claro.",
    },
    {
      role: "user",
      content: originalText,
    },
  ];

  const result = await chat(messages, "llama-3.3-70b-versatile", {
    temperature: 0.5,
    maxTokens: 1000,
  });

  return result;
}
