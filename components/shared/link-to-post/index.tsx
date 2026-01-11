import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MsgTooltipContent } from "./msg-tooltip-content";

interface IProps {
  topicId: string;
  n: number;
}

export const LinkToPost: React.FC<IProps> = ({ topicId, n }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className="cursor-pointer">
          (<span className="text-linkColor">{n}</span>)
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-140 p-0" side="right" align="start">
        <MsgTooltipContent
          topicId={topicId}
          n={n}
          close={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};
