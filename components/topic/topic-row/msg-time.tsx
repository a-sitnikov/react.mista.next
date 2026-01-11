import { IMessage } from "@/app/api/topic/topic.schema";
import dayjs from "dayjs";
import { useMemo } from "react";

interface IProps {
  item: IMessage;
}

export const MsgTime: React.FC<IProps> = ({ item }) => {
  const timeStr = useMemo(
    () => dayjs(item.time).format("DD.MM.YYYY - HH:mm"),
    [item.time]
  );

  if (item.n === 0) {
    return <div className="text-sm">{timeStr}</div>;
  }

  return <div className="text-sm">{`${item.n} - ${timeStr}`}</div>;
};
