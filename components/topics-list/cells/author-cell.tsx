import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const AuthorCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-xs flex [grid-area:author] ">
    <a href={`/user/${item.author.id}`} className="my-auto break-all">
      {item.author.name}
    </a>
  </div>
);
