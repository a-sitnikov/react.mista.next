import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";
import Link from "next/link";

type IProps = {
  item: ITopicsListItem;
};

export const TitleCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-sm flex [grid-area:title] ">
    <div className="my-auto">
      <Link href={`/topic/${item.id}`}>{item.text}</Link>
    </div>
  </div>
);
