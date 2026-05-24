import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
};

export const UpdatedCell: React.FC<IProps> = ({ item }) => (
  <div className="p-1.5 border-r text-xs flex [grid-area:lastuser]">
    <div className="my-auto">
      <span className="break-all">{item.updated}</span>
    </div>
  </div>
);
