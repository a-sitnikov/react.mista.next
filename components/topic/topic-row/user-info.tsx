import { MsgTime } from "./msg-time";
import { UserLink } from "./user-link";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  isAuthor: boolean;
}

export const UserInfo: React.FC<IProps> = ({ item, isAuthor }) => {
  return (
    <div className="[grid-area:user] border-r py-3 px-2 text-right">
      <UserLink id={item.user.id} name={item.user.name} isAuthor={isAuthor} />
      <MsgTime item={item} />
    </div>
  );
};
