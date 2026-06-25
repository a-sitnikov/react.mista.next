import { UserInfo } from "./user-info";
import { MsgBlock } from "./msg-block";
import { IMessage, IUser } from "@/mista-api/types";

interface IProps {
  item: IMessage;
  topicId: string;
  isAuthor: boolean;
  readers?: IUser[];
}

export const TopicRow: React.FC<IProps> = ({
  item,
  topicId,
  isAuthor,
  readers,
}) => {
  const userOnline =
    readers?.some((reader) => reader.id === item.user.id) ?? false;

  return (
    <div className="c-topic-row">
      <UserInfo item={item} isAuthor={isAuthor} online={userOnline} />
      <MsgBlock item={item} topicId={topicId} />
    </div>
  );
};
