import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const CountCell: React.FC<IProps> = ({ item }) => (
  <div
    className="border-r text-xs 
                flex cursor-pointer                
                max-md:border-t max-md:border-borderOuter
                max-md:border-r-0
                max-md:bg-tableHeaderBg
                max-md:py-0 max-md:px-1.5 max-md:text-[13px]
                [grid-area:count]"
  >
    <div className="md:m-auto max-md:ml-auto">{item.count}</div>
  </div>
);
