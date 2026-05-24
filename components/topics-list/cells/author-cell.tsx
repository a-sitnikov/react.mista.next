import { ITopicsListItem } from "@/mista-api/types";
import Link from "next/link";

type IProps = {
  item: ITopicsListItem;
};

export const AuthorCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-xs flex [grid-area:author] ">
    <Link
      href={`/user/${item.author.id}`}
      prefetch={false}
      className="my-auto break-all"
    >
      {item.author.name}
    </Link>
  </div>
);
