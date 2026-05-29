import { UserInfo } from "./user-info";
import { MsgText } from "./msg-text";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  topicId: string;
  isAuthor: boolean;
}

export const TopicRow: React.FC<IProps> = ({ item, topicId, isAuthor }) => {
  return (
    <div className="c-topic-row">
      <UserInfo item={item} isAuthor={isAuthor} />
      <MsgText item={item} topicId={topicId} />
    </div>
  );
};
