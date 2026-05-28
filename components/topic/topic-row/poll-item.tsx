import { DOMAIN } from "@/app/api/constants";
import { IPollItem } from "@/mista-api/types";
import Link from "next/link";

type IProps = {
  item: IPollItem;
  vartiant: {
    color: string;
    img: string;
  };
  imgWidth: number;
};

export const PollItem: React.FC<IProps> = ({ item, vartiant, imgWidth }) => {
  return (
    <li
      className="grid items-center col-gap-2 row-gap-1
                grid-cols-[1fr_100px_1fr] 
                [grid-template-areas:'title_percentage_bar'] 
                max-md:grid-cols-[1fr_100px]
                max-md:[grid-template-areas:'title_percentage''bar_bar']"
      style={{ color: vartiant.color }}
    >
      <div className="[grid-area:title]">
        <Link
          rel="nofollow"
          href={`?variant=${item.number}`}
          prefetch={false}
          className="text-inherit"
        >
          <b>{`${item.number}. ${item.text}`}</b>
        </Link>
      </div>
      <div className="[grid-area:percentage] max-md:justify-self-end">
        <b>{`${item.percentage}% (${item.votes})`}</b>
      </div>
      {item.percentage > 0 && (
        <div className="[grid-area:bar]">
          <a href={"/"}>
            <img
              src={`${DOMAIN}${vartiant.img}`}
              alt={`вариант ${item.number}`}
              className="block h-4"
              style={{ width: `${imgWidth}%` }}
            />
          </a>
        </div>
      )}
    </li>
  );
};
