import { MsgBlock } from "@/components/topic/topic-row/msg-block";
import { MsgTime } from "@/components/topic/topic-row/msg-time";
import { UserLink } from "@/components/topic/topic-row/user-link";
import { IMessage, ITopicsListItem } from "@/mista-api/types";

interface IProps {
  topic: ITopicsListItem;
  data: IMessage;
  msgNumber: number;
}

export const PreviewContent: React.FC<IProps> = ({ topic, data }) => {
  const isAuthor = data.user.id === topic.author.id;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 border-b pb-0">
        <UserLink id={data.user.id} name={data.user.name} isAuthor={isAuthor} />
        <MsgTime item={data} />
      </div>
      <MsgBlock item={data} topicId={topic.id} />
    </div>
  );
};
