import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MsgTooltipContent } from "./msg-tooltip-content";
import { DragDropProvider, useDraggable } from "@dnd-kit/react";

interface IProps {
  topicId: string;
  n: number;
}

export const LinkToPost: React.FC<IProps> = ({ topicId, n }) => {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const { ref, handleRef } = useDraggable({ id: `${topicId}-${n}` });

  if (n === 1) console.log(open, offset);

  return (
    <DragDropProvider
      onDragEnd={({ operation }) => {
        setOffset((prev) => ({
          x: prev.x + operation.transform.x,
          y: prev.y + operation.transform.y,
        }));
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className="cursor-pointer">
            (<span className="text-linkColor">{n}</span>)
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="w-140 p-0"
          side="right"
          align="start"
          ref={ref}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            willChange: "transform",
          }}
          avoidCollisions={offset.x === 0 && offset.y === 0}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <MsgTooltipContent topicId={topicId} n={n} headerRef={handleRef} />
        </PopoverContent>
      </Popover>
    </DragDropProvider>
  );
};
