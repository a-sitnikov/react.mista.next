import { MsgBlock } from "@/components/topic/topic-row/msg-block";
import { IMessage } from "@/mista-api/types";

interface IProps {
  item?: IMessage;
  topicId: string;
}

export const MsgTooltipBody: React.FC<IProps> = ({ item, topicId }) => {
  if (!item) return null;

  return (
    <MsgBlock
      item={item}
      topicId={topicId}
      className="max-h-[80vh] py-2 overflow-y-auto overflow-x-hidden break-all scrollbar-thin"
    />
  );
};
