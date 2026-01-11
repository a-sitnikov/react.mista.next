import { IMessage } from "@/app/api/topic/topic.schema";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { MsgTime } from "./msg-time";

interface IProps {
  item: IMessage;
  isAuthor: boolean;
}

export const UserInfo: React.FC<IProps> = ({ item, isAuthor }) => {
  return (
    <div className="[grid-area:user] border-r py-3 px-2 text-right">
      <Link
        href={`/user/${item.userId}`}
        className={twMerge(
          "font-bold px-1 text-foreground",
          isAuthor && "bg-amber-400 rounded-xs"
        )}
      >
        {item.user}
      </Link>
      <MsgTime item={item} />
    </div>
  );
};
