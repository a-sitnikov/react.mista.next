import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";
import { formatTime } from "@/lib/date";

type IProps = {
  item: ITopicsListItem;
};

export const LastUserCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-xs flex [grid-area:lastuser]">
    <div className="my-auto">
      <span className="mr-1">{formatTime(item.updated)}</span>
      <span className="break-all">{item.lastUser}</span>
    </div>
  </div>
);
