import { IMessage } from "@/app/api/topic/topic.schema";
import { UserInfo } from "./user-info";
import { MsgText } from "./msg-text";

interface IProps {
  item: IMessage;
  topicId: string;
  isAuthor: boolean;
}

export const TopicRow: React.FC<IProps> = ({ item, topicId, isAuthor }) => {
  return (
    <div className="grid grid-cols-[165px_1fr] [grid-template-areas:'user_message'] border-t bg-background">
      <UserInfo item={item} isAuthor={isAuthor} />
      <MsgText item={item} topicId={topicId} />
    </div>
  );
};
