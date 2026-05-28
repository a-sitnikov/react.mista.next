import { IMessage } from "@/mista-api/types";

interface IProps {
  item: IMessage;
}

export const MsgTime: React.FC<IProps> = ({ item }) => {
  return <div className="text-sm text-end">{`${item.n} - ${item.date}`}</div>;
};
