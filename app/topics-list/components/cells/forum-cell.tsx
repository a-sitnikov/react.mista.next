import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";

type IProps = {
  item: ITopicsListItem;
};

export const ForumCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-l border-r text-xs flex [grid-area:forum] ">
    <div className="m-auto">{item.forum}</div>
  </div>
);
