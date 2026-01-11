import { IMessage } from "@/app/api/topic/topic.schema";
import { MsgText } from "@/components/topic/topic-row/msg-text";

interface IProps {
  item?: IMessage;
  topicId: string;
}

export const MsgTooltipBody: React.FC<IProps> = ({ item, topicId }) => {
  if (!item) return null;

  return (
    <MsgText
      item={item}
      topicId={topicId}
      classname="max-h-130 py-2 overflow-y-auto overflow-x-hidden break-all [scrollbar-width:thin]"
    />
  );
};
