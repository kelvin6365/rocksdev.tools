"use client";

import { Tool } from "@/types/tool";
import { sendGAEvent } from "@next/third-parties/google";
import { createContext, useContext, useEffect, useState } from "react";

type ToolContextType = {
  incrementToolUsage: (tool: string) => void;
  setTools: (tools: Tool[]) => void;
  toolUsageCount: number;
  tools: Tool[];
};

const ToolContext = createContext<ToolContextType>({
  incrementToolUsage: () => {},
  setTools: () => {},
  toolUsageCount: 0,
  tools: [],
});

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const [toolUsageCount, setToolUsageCount] = useState(0);
  const [tools, _setTools] = useState<Tool[]>([]);
  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("toolUsageCount") || "0");
    const storedTools = localStorage.getItem("tools") || "[]";
    setToolUsageCount(storedCount);
    _setTools(JSON.parse(storedTools));
  }, []);

  const setTools = (tools: Tool[]) => {
    _setTools(tools);
    localStorage.setItem("tools", JSON.stringify(tools));
  };

  const incrementToolUsage = (tool: string) => {
    const newCount = toolUsageCount + 1;
    setToolUsageCount(newCount);
    sendGAEvent("event", "tool_used", {
      tool: tool,
    });
    localStorage.setItem("toolUsageCount", newCount.toString());
  };

  return (
    <ToolContext.Provider
      value={{ incrementToolUsage, toolUsageCount, tools, setTools }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export const useTool = () => useContext(ToolContext);
