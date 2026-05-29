import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const ArenaCell: React.FC<IProps> = ({ item }) => (
  <div
    className="text-xs flex p-1.5 
      border-r
      max-md:hidden
      [grid-area:arena]"
  >
    <div className="m-auto">{item.arena}</div>
  </div>
);
