import { MsgTime } from "@/components/topic/topic-row/msg-time";
import { UserLink } from "@/components/topic/topic-row/user-link";
import { Button } from "@/components/ui/button";
import { IMessage } from "@/mista-api/types";
import { X } from "lucide-react";

interface IProps {
  item?: IMessage;
  close: () => void;
}

export const MsgTooltipHeader: React.FC<IProps> = ({ item, close }) => {
  if (!item) return null;

  return (
    <div className="flex items-center justify-between gap-2 border-b p-1 pl-2">
      <div className="flex gap-1 items-center justify-between grow">
        <UserLink id={item.user.id} name={item.user.name} isAuthor={false} />
        <MsgTime item={item} />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer"
        onClick={close}
      >
        <X />
      </Button>
    </div>
  );
};
