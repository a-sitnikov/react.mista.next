import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";

type IProps = {
  item: ITopicsListItem;
};

export const AuthorCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-xs flex [grid-area:author] ">
    <div className="my-auto break-all">{item.author}</div>
  </div>
);
