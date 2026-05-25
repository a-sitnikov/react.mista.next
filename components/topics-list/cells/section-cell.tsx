import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const SectionCell: React.FC<IProps> = ({ item }) => (
  <div
    className="text-xs p-1.5 
      hidden 
      max-md:flex
      max-md:border-b max-md:border-borderOuter
      max-md:bg-tableHeaderBg
      max-md:py-0 max-md:text-[13px]
      [grid-area:section]"
  >
    <div className="md:m-auto max-md:ml-auto">{item.section ?? item.arena}</div>
  </div>
);
