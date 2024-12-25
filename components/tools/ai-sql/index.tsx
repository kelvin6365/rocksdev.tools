"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useTool } from "@/contexts/tool-context";
import { useSQLGenerator } from "@/hooks/use-SQL-generator";
import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  Code,
  Copy,
  FileUp,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Plus,
  Send,
  Trash,
} from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

const ChatItem = ({
  title,
  preview,
  timestamp,
  isActive = false,
  onClick,
}: {
  title: string;
  preview: string;
  timestamp: number;
  isActive?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`p-2 rounded-lg cursor-pointer ${
      isActive ? "bg-muted" : "hover:bg-muted/50"
    }`}
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{preview}</div>
      </div>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNow(timestamp, { addSuffix: true })}
      </span>
    </div>
  </div>
);

const EmptyConversation = ({ onNewChat }: { onNewChat: () => void }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center px-4">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{t("dev.ai-sql.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">
        {t("dev.ai-sql.description")}
      </p>
      <div className="space-y-4 w-full">
        <Button onClick={onNewChat} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          {t("dev.ai-sql.start_new")}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("dev.ai-sql.how_to_use")}
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">{t("dev.ai-sql.example_title")}</p>
          <pre className="bg-muted p-3 rounded-lg text-left overflow-x-auto">
            <code>
              {`export interface BaseTool {
  id: string;
  label: string;
  value: string;
  href: string;
  description: string;
  category: string;
  icon?: string;
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const EmptySidebar = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center h-32">
      <p className="text-sm text-muted-foreground">{t("dev.ai-sql.welcome")}</p>
    </div>
  );
};

export function AiSqlBot() {
  const t = useTranslations();
  const { incrementToolUsage } = useTool();
  const [input, setInput] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const {
    conversations,
    currentConversation,
    isLoading,
    createNewChat,
    addMessage,
    switchConversation,
    deleteConversation,
    updateLanguage,
    updateDialect,
    currentLanguage,
    currentDialect,
  } = useSQLGenerator();

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    try {
      setIsProcessing(true);

      // Add user message
      await addMessage(input, "user");

      // TODO: Detect language from input
      const detectedLanguage = "java"; // This should be determined by AI
      await updateLanguage(detectedLanguage);

      // TODO: API call to generate SQL
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add AI response
      await addMessage("hi", "system", {
        language: detectedLanguage,
        sqlDialect: currentDialect || "mysql",
      });

      incrementToolUsage("ai-sql");
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("dev.ai-sql.error.generation"));

      // Add error message
      await addMessage(t("dev.ai-sql.error.generation"), "system", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewChat = async () => {
    await createNewChat();
  };

  const handleCopy = (sql: string | undefined) => {
    if (!sql) return;
    navigator.clipboard.writeText(sql);
    toast.success(t("dev.ai-sql.message.copied"));
  };

  const renderMainContent = () => {
    if (!currentConversation) {
      return <EmptyConversation onNewChat={handleNewChat} />;
    }

    return (
      <>
        <div className="bg-background border-b px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">
              {currentConversation.title || t("dev.ai-sql.current-conversion")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentLanguage && currentDialect
                ? `${currentLanguage} → ${currentDialect}`
                : t("dev.ai-sql.conversion-type")}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              deleteConversation(currentConversation.id!);
            }}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentConversation.messages.map((msg, idx) => (
              <Card
                key={idx}
                className={msg.type === "user" ? "ml-12" : "mr-12"}
              >
                <CardContent className="p-4">
                  <div className="prose dark:prose-invert">{msg.content}</div>
                  {msg.type === "system" && msg.sql && (
                    <div className="mt-2">
                      <div className="bg-muted p-3 rounded-md">
                        <pre className="text-sm">{msg.sql}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleCopy(msg.sql)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {t("dev.ai-sql.copy-sql")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-4 bg-background">
          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="sm">
              <Code className="w-4 h-4 mr-2" />
              {t("dev.ai-sql.paste-code")}
            </Button>
            <Button variant="outline" size="sm">
              <FileUp className="w-4 h-4 mr-2" />
              {t("dev.ai-sql.upload-file")}
            </Button>
          </div>
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("dev.ai-sql.input.placeholder")}
              className="flex-1"
              rows={3}
            />
            <Button
              onClick={handleSend}
              className="self-end"
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-20rem)] p-2">
      {/* Left sidebar */}
      <div className="w-[240px] border-r flex flex-col">
        <div className="p-4 border-b">
          <Button variant="outline" className="w-full" onClick={handleNewChat}>
            <MessagesSquare className="w-4 h-4 mr-2" />
            {t("dev.ai-sql.new-conversion")}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="flex items-center px-2 py-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              <span>{t("dev.ai-sql.recent")}</span>
            </div>
            <div className="space-y-1 mt-2">
              {conversations.length > 0 ? (
                conversations.map((conv) => (
                  <ChatItem
                    key={conv.id}
                    title={conv.title}
                    preview={`${conv.inputType || "?"} → ${conv.outputType || "SQL"}`}
                    timestamp={conv.lastUpdated}
                    isActive={conv.id === currentConversation?.id}
                    onClick={() => switchConversation(conv.id!)}
                  />
                ))
              ) : (
                <EmptySidebar />
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">{renderMainContent()}</div>
    </div>
  );
}
