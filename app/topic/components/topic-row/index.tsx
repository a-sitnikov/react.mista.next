import { IMessage } from "@/app/api/topic/topic.schema";
import { UserInfo } from "./user-info";
import { MsgText } from "./msg-text";

interface IProps {
  item: IMessage;
  isAuthor: boolean;
}

export const TopicRow: React.FC<IProps> = ({ item, isAuthor }) => {
  return (
    <div className="grid grid-cols-[165px_1fr] [grid-template-areas:'user_message'] border-t">
      <UserInfo item={item} isAuthor={isAuthor} />
      <MsgText item={item} />
    </div>
  );
};
