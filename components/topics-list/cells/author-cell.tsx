import { MISTA_DOMAIN } from "@/app/api/constants";
import { ITopicsListItem } from "@/mista-api/types";
import Link from "next/link";

type IProps = {
  item: ITopicsListItem;
};

export const AuthorCell: React.FC<IProps> = ({ item }) => (
  <div
    className="p-1.5 border-r text-xs flex 
                max-md:border-b max-md:border-borderOuter
                max-md:border-r-0
                max-md:bg-tableHeaderBg
                max-md:py-0 max-md:text-[13px] max-md:font-semibold
                [grid-area:author]"
  >
    <Link
      href={`${MISTA_DOMAIN}/user/${item.author.id}`}
      prefetch={false}
      className="my-auto break-all text-inherit"
    >
      {item.author.name}
    </Link>
  </div>
);
