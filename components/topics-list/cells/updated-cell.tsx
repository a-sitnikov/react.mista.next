import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const UpdatedCell: React.FC<IProps> = ({ item }) => (
  <div
    className="p-1.5 text-xs flex
                border-r border-borderOuter 
                max-md:border-t 
                max-md:border-r-0
                max-md:bg-tableHeaderBg
                max-md:py-0 max-md:text-[13px]
                [grid-area:updated]"
  >
    <div className="my-auto">
      <span className="break-all">{item.updated}</span>
    </div>
  </div>
);
