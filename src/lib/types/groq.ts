import { Error as ApiError } from "./api";

export interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GroqChatCompletionRequest {
  model: string;
  messages: GroqChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string | string[];
}

export interface GroqChatCompletionChoice {
  index: number;
  message: GroqChatMessage;
  finish_reason: string;
}

export interface GroqChatCompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface GroqChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqChatCompletionChoice[];
  usage: GroqChatCompletionUsage;
}

export interface GroqStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }[];
}

export type GroqModel =
  | "llama-3.3-70b-versatile"
  | "llama-3.1-70b-versatile"
  | "llama-3.1-8b-instant"
  | "mixtral-8x7b-32768"
  | "gemma2-9b-it"
  | "gemma-7b-it";

export interface GroqServiceResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface GroqError {
  message: string;
  type: string;
  code?: string;
}
