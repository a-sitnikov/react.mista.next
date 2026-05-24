import { ITopicsListItem } from "@/mista-api/types";
import Link from "next/link";

type IProps = {
  item: ITopicsListItem;
};

export const TitleCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r flex [grid-area:title] ">
    <div className="my-auto">
      <Link href={`/topic/${item.id}`} prefetch={false}>
        {item.text}
      </Link>
    </div>
  </div>
);
