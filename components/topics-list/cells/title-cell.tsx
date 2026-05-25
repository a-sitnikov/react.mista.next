import { ITopicsListItem } from "@/mista-api/types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type IProps = {
  item: ITopicsListItem;
};

export const TitleCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r flex [grid-area:title] ">
    <div className="my-auto">
      <Link
        href={`/topic/${item.id}`}
        prefetch={false}
        className={twMerge(
          "max-md:text-[16px]",
          "hover:text-linkHover",
          item.count >= 100 && "font-semibold",
        )}
      >
        {item.text}
      </Link>
      {item.isVoting && <span className="text-muted-foreground ml-1">[±]</span>}
      {item.closed && <span className="text-muted-foreground ml-1">Ø</span>}
      {item.down && <span className="text-muted-foreground ml-1">↓</span>}
      {item.count > 20 && (
        <Link
          href={`/topic/${item.id}#F`}
          className="ml-1 text-muted-foreground"
        >
          »
        </Link>
      )}
    </div>
  </div>
);
