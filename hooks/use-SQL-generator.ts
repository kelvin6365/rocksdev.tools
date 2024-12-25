"use client";

import { useState, useEffect, useCallback } from "react";
import { useDb } from "@/lib/db";
import type { Conversation, Message } from "@/lib/db";

export function useSQLGenerator() {
  const db = useDb();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);
  const [currentConversation, setCurrentConversation] = useState<
    (Conversation & { messages: Message[] }) | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load conversations
  const loadConversations = useCallback(async () => {
    const convs = await db?.getConversations();
    if (!convs) {
      setIsLoading(false);
      return;
    }
    setConversations(convs);

    // Set first conversation as current if none selected
    if (!currentConversationId && convs.length > 0) {
      setCurrentConversationId(convs[0].id ?? null);
    }
    setIsLoading(false);
  }, [db, currentConversationId]);

  // Load current conversation with messages
  const loadCurrentConversation = useCallback(async () => {
    if (!currentConversationId) {
      setCurrentConversation(null);
      return;
    }

    const conv = await db?.getConversationWithMessages(currentConversationId);
    if (!conv) {
      setCurrentConversation(null);
      return;
    }
    setCurrentConversation(conv);
  }, [db, currentConversationId]);

  // Initial load
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load messages when conversation changes
  useEffect(() => {
    loadCurrentConversation();
  }, [loadCurrentConversation, currentConversationId]);

  // Create new chat
  const createNewChat = useCallback(async () => {
    const newConversation = await db?.createConversation({
      title: "New Conversion",
      preview: "Code → SQL",
      metadata: {
        isComplete: false,
      },
    });

    if (newConversation?.id) {
      setCurrentConversationId(newConversation.id);
      await loadConversations();
    }
  }, [db, loadConversations]);

  // Add message with metadata support
  const addMessage = useCallback(
    async (
      content: string,
      type: Message["type"] = "user",
      metadata?: {
        language?: string;
        sqlDialect?: string;
        error?: string;
      },
    ) => {
      if (!currentConversationId) return;

      await db?.addMessage(currentConversationId, {
        content,
        type,
        metadata,
      });

      await loadCurrentConversation();
      await loadConversations();
    },
    [db, currentConversationId, loadCurrentConversation, loadConversations],
  );

  // Update detected language
  const updateLanguage = useCallback(
    async (language: string) => {
      if (!currentConversationId) return;
      await db?.updateDetectedLanguage(currentConversationId, language);
      await loadCurrentConversation();
      await loadConversations();
    },
    [db, currentConversationId, loadCurrentConversation, loadConversations],
  );

  // Update SQL dialect
  const updateDialect = useCallback(
    async (dialect: string) => {
      if (!currentConversationId) return;
      await db?.updateSQLDialect(currentConversationId, dialect);
      await loadCurrentConversation();
      await loadConversations();
    },
    [db, currentConversationId, loadCurrentConversation, loadConversations],
  );

  const updateTitle = useCallback(
    async (title: string) => {
      if (!currentConversationId) return;
      await db?.updateConversation(currentConversationId, { title });
      await loadCurrentConversation();
      await loadConversations();
    },
    [db, currentConversationId, loadCurrentConversation, loadConversations],
  );

  // Update conversation metadata
  const updateMetadata = useCallback(
    async (metadata: Partial<Conversation["metadata"]>) => {
      if (!currentConversationId) return;
      await db?.updateConversation(currentConversationId, {
        metadata: {
          ...currentConversation?.metadata,
          ...metadata,
        },
      });
      await loadCurrentConversation();
    },
    [db, currentConversationId, currentConversation, loadCurrentConversation],
  );

  // Switch conversation
  const switchConversation = useCallback((id: number) => {
    setCurrentConversationId(id);
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(
    async (id: number) => {
      await db?.deleteConversation(id);
      await loadConversations();

      if (currentConversationId === id) {
        setCurrentConversationId(null);
      }
    },
    [db, currentConversationId, loadConversations],
  );

  return {
    conversations,
    currentConversation,
    isLoading,
    createNewChat,
    addMessage,
    switchConversation,
    deleteConversation,
    updateLanguage,
    updateDialect,
    updateTitle,
    updateMetadata,
    // Helper getters for current conversation
    currentLanguage: currentConversation?.inputType,
    currentDialect: currentConversation?.outputType,
    isComplete: currentConversation?.metadata?.isComplete,
  };
}
