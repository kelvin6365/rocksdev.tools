"use client";
import Dexie, { Table } from "dexie";

// Types
export interface Message {
  id?: number;
  conversationId: number;
  type: "user" | "system" | "ai";
  content: string;
  sql?: string;
  timestamp: number;
  metadata?: {
    language?: string; // Detected language
    sqlDialect?: string; // Used SQL dialect
    error?: string; // Any error message
  };
}

export interface Conversation {
  id?: number;
  title: string;
  preview: string;
  inputType?: string; // Can be any programming language
  outputType?: string; // Can be any SQL dialect
  lastUpdated: number;
  createdAt: number;
  metadata?: {
    detectedLanguage?: string;
    preferredDialect?: string;
    isComplete?: boolean;
  };
}

// Database class
class SQLGeneratorDB extends Dexie {
  conversations!: Table<Conversation>;
  messages!: Table<Message>;

  constructor() {
    super("SQLGeneratorDB");

    this.version(1).stores({
      conversations:
        "++id, title, inputType, outputType, lastUpdated, createdAt",
      messages: "++id, conversationId, type, timestamp",
    });
  }
}

// Create a singleton instance
let db: SQLGeneratorDB | null = null;

// Safe initialization function for client-side only
const getDB = () => {
  if (typeof window === "undefined") return null;
  if (!db) {
    db = new SQLGeneratorDB();
  }
  return db;
};

// Database service class
export class DbService {
  private static instance: DbService;
  private db: SQLGeneratorDB | null = null;

  private constructor() {
    this.db = getDB();
  }

  public static getInstance(): DbService {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }
    return DbService.instance;
  }

  private ensureDB() {
    if (!this.db) {
      throw new Error("Database is not available on the server side");
    }
    return this.db;
  }

  async getConversations() {
    try {
      const db = this.ensureDB();
      return await db.conversations.orderBy("lastUpdated").reverse().toArray();
    } catch (error) {
      console.error("Failed to get conversations:", error);
      return [];
    }
  }

  async getConversation(id: number) {
    try {
      const db = this.ensureDB();
      return await db.conversations.get(id);
    } catch (error) {
      console.error(`Failed to get conversation ${id}:`, error);
      return null;
    }
  }

  async createConversation(data: {
    title?: string;
    preview?: string;
    inputType?: string;
    outputType?: string;
    metadata?: Conversation["metadata"];
  }) {
    try {
      const db = this.ensureDB();
      const timestamp = Date.now();

      const id = await db.conversations.add({
        title: data.title || "New Conversion",
        preview: data.preview || "Code → SQL",
        inputType: data.inputType,
        outputType: data.outputType,
        metadata: data.metadata || {},
        lastUpdated: timestamp,
        createdAt: timestamp,
      });

      // Add welcome message
      await db.messages.add({
        conversationId: id,
        type: "system",
        content: "Welcome! Start by pasting your code or uploading a file.",
        timestamp,
        metadata: {
          language: data.inputType,
          sqlDialect: data.outputType,
        },
      });

      return this.getConversationWithMessages(id);
    } catch (error) {
      console.error("Failed to create conversation:", error);
      return null;
    }
  }

  async updateConversation(id: number, data: Partial<Conversation>) {
    try {
      const db = this.ensureDB();
      await db.conversations.update(id, {
        ...data,
        lastUpdated: Date.now(),
      });
      return true;
    } catch (error) {
      console.error(`Failed to update conversation ${id}:`, error);
      return false;
    }
  }

  async deleteConversation(id: number) {
    try {
      const db = this.ensureDB();
      await db.transaction("rw", db.conversations, db.messages, async () => {
        await db.messages.where("conversationId").equals(id).delete();
        await db.conversations.delete(id);
      });
      return true;
    } catch (error) {
      console.error(`Failed to delete conversation ${id}:`, error);
      return false;
    }
  }

  async getMessages(conversationId: number) {
    try {
      const db = this.ensureDB();
      return await db.messages
        .where("conversationId")
        .equals(conversationId)
        .sortBy("timestamp");
    } catch (error) {
      console.error(
        `Failed to get messages for conversation ${conversationId}:`,
        error,
      );
      return [];
    }
  }

  async addMessage(
    conversationId: number,
    message: Omit<Message, "id" | "conversationId" | "timestamp">,
  ) {
    try {
      const db = this.ensureDB();
      const timestamp = Date.now();

      await db.transaction("rw", db.conversations, db.messages, async () => {
        await db.messages.add({
          conversationId,
          ...message,
          timestamp,
        });

        // Update conversation with any detected language or dialect
        if (message.metadata?.language || message.metadata?.sqlDialect) {
          await db.conversations.update(conversationId, {
            lastUpdated: timestamp,
            inputType: message.metadata.language || undefined,
            outputType: message.metadata.sqlDialect || undefined,
            metadata: {
              detectedLanguage: message.metadata.language,
              preferredDialect: message.metadata.sqlDialect,
            },
          });
        } else {
          await db.conversations.update(conversationId, {
            lastUpdated: timestamp,
          });
        }
      });

      return true;
    } catch (error) {
      console.error("Failed to add message:", error);
      return false;
    }
  }

  async getConversationWithMessages(conversationId: number) {
    try {
      const conversation = await this.getConversation(conversationId);
      if (!conversation) return null;

      const messages = await this.getMessages(conversationId);

      return {
        ...conversation,
        messages,
      };
    } catch (error) {
      console.error(
        `Failed to get conversation ${conversationId} with messages:`,
        error,
      );
      return null;
    }
  }

  // Update language detection
  async updateDetectedLanguage(id: number, language: string) {
    return this.updateConversation(id, {
      inputType: language,
      metadata: {
        detectedLanguage: language,
      },
    });
  }

  // Update SQL dialect preference
  async updateSQLDialect(id: number, dialect: string) {
    return this.updateConversation(id, {
      outputType: dialect,
      metadata: {
        preferredDialect: dialect,
      },
    });
  }
}

export const useDb = () => {
  if (typeof window === "undefined") {
    return;
  }
  return DbService.getInstance();
};
