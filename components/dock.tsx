"use client";

import { useTool } from "@/contexts/tool-context";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { config } from "@/services/config";
import { Tool } from "@/types/tool";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function DockItem({
  tool,
  isDragging,
  style,
}: {
  tool: Tool;
  isDragging?: boolean;
  style?: React.CSSProperties;
}) {
  const t = useTranslations("nav.tools");
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const getTool = () => {
    //the id is from subTools value
    return config.tools
      .find((t) => t.value?.includes(tool.id.split(".")[0]))
      ?.subTools?.find((t) => t.value === tool.id);
  };
  return (
    <motion.div
      animate={{
        scale: isHovered && !isDragging ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      style={style}
      className={cn(
        "relative flex items-center justify-center",
        "w-12 h-12 rounded-xl",
        "bg-white dark:bg-neutral-800",
        "shadow-sm",
        !isDragging && "hover:shadow-md",
        "transition-shadow duration-200",
        isDragging && [
          "shadow-xl",
          "border-2 border-primary/20",
          "scale-105",
          "cursor-grabbing",
        ],
      )}
    >
      <Tooltip>
        <TooltipTrigger>
          <div
            className="flex items-center justify-center w-full h-full"
            onMouseEnter={() => !isDragging && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
                return;
              }
              //Send event to analytics GA
              sendGAEvent({
                event: "dock_tool_clicked",
                tool: getTool()?.value,
              });
              router.push(tool.href || "");
            }}
          >
            <span className="text-2xl select-none">{getTool()?.icon}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="z-[9999]">
          {t(getTool()?.value + ".title")}
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}

function SortableDockItem({ tool }: { tool: Tool }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: tool.id,
    data: {
      tool,
    },
  });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        cursor: isDragging ? "grabbing" : "grab",
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DockItem tool={tool} isDragging={isDragging} />
    </div>
  );
}

function DroppableDock({ tools }: { tools: Tool[] }) {
  const { setNodeRef } = useDroppable({ id: "dock" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "p-2 rounded-2xl backdrop-blur-md",
        "bg-neutral-50/90 dark:bg-neutral-900/90",
        "border border-neutral-200/50 dark:border-neutral-700/50",
        "shadow-lg dark:shadow-2xl relative",
      )}
    >
      <SortableContext
        items={tools.map((tool) => tool.id)}
        strategy={horizontalListSortingStrategy}
      >
        <TooltipProvider>
          <div className="flex items-center gap-2">
            {tools.map((tool) => (
              <SortableDockItem key={tool.id} tool={tool} />
            ))}
          </div>
        </TooltipProvider>
      </SortableContext>
    </div>
  );
}

export function Dock() {
  const { tools, setTools } = useTool();
  const [_, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);
    setActiveId(null);

    // If dropped in remove zone
    if (!over) {
      setTools(tools.filter((tool) => tool.id !== active.id));
      return;
    }

    // Handle reordering
    if (over && active.id !== over.id) {
      const oldIndex = tools.findIndex((tool) => tool.id === active.id);
      const newIndex = tools.findIndex((tool) => tool.id === over.id);
      if (oldIndex !== newIndex) {
        setTools(arrayMove(tools, oldIndex, newIndex));
      }
    }
  };

  if (tools.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 flex justify-center items-end pb-4 z-[999]",
      )}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DroppableDock tools={tools} />
      </DndContext>
    </div>
  );
}
