import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const CountCell: React.FC<IProps> = ({ item }) => (
  <div className="border-r text-xs flex [grid-area:count] cursor-pointer">
    <div className="m-auto">{item.count}</div>
  </div>
);
