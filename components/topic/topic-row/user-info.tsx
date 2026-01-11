import { IMessage } from "@/app/api/topic/topic.schema";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { MsgTime } from "./msg-time";
import { UserLink } from "./user-link";

interface IProps {
  item: IMessage;
  isAuthor: boolean;
}

export const UserInfo: React.FC<IProps> = ({ item, isAuthor }) => {
  return (
    <div className="[grid-area:user] border-r py-3 px-2 text-right">
      <UserLink id={item.userId} name={item.user} isAuthor={isAuthor} />
      <MsgTime item={item} />
    </div>
  );
};
