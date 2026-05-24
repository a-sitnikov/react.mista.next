import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
}

export const MsgTime: React.FC<IProps> = ({ item }) => {
  return <div className="text-sm">{`${item.n} - ${item.date}`}</div>;
};
