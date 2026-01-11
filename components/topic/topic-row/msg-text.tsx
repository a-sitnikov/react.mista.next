import { IMessage } from "@/app/api/topic/topic.schema";

interface IProps {
  item: IMessage;
}

export const MsgText: React.FC<IProps> = ({ item }) => {
  return (
    <div
      className="[grid-area:message] p-3"
      dangerouslySetInnerHTML={{ __html: item.text }}
    />
  );
};
