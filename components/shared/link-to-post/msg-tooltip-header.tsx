import { MsgTime } from "@/components/topic/topic-row/msg-time";
import { UserLink } from "@/components/topic/topic-row/user-link";
import { Button } from "@/components/ui/button";
import { IMessage } from "@/mista-api/types";
import { X } from "lucide-react";
import { Popover } from "radix-ui";

interface IProps {
  item?: IMessage;
  ref?: React.Ref<HTMLDivElement>;
}

export const MsgTooltipHeader: React.FC<IProps> = ({ ref, item }) => {
  if (!item) return null;

  return (
    <div className="flex items-center justify-between gap-2 border-b p-1 pl-2">
      <div className="flex gap-1 items-center justify-between grow" ref={ref}>
        <UserLink id={item.user.id} name={item.user.name} isAuthor={false} />
        <MsgTime item={item} />
      </div>
      <Popover.Close asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <X />
        </Button>
      </Popover.Close>
    </div>
  );
};
