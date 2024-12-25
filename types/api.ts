export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ApiRequest {
  messages: Message[];
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface ApiError {
  message: string;
  status: number;
}
