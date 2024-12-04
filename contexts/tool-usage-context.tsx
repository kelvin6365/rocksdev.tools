"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ToolUsageContextType = {
  incrementToolUsage: () => void;
  toolUsageCount: number;
};

const ToolUsageContext = createContext<ToolUsageContextType>({
  incrementToolUsage: () => {},
  toolUsageCount: 0,
});

export function ToolUsageProvider({ children }: { children: React.ReactNode }) {
  const [toolUsageCount, setToolUsageCount] = useState(
    parseInt(localStorage.getItem("toolUsageCount") || "0"),
  );

  useEffect(() => {
    localStorage.setItem("toolUsageCount", toolUsageCount.toString());
  }, [toolUsageCount]);

  const incrementToolUsage = () => {
    const newCount = toolUsageCount + 1;
    setToolUsageCount(newCount);
    localStorage.setItem("toolUsageCount", newCount.toString());
  };

  return (
    <ToolUsageContext.Provider value={{ incrementToolUsage, toolUsageCount }}>
      {children}
    </ToolUsageContext.Provider>
  );
}

export const useToolUsage = () => useContext(ToolUsageContext);
