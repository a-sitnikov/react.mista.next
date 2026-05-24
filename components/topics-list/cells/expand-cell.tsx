import { ITopicsListItem } from "@/mista-api/types";
import { SquarePlus } from "lucide-react";

type IProps = {
  item: ITopicsListItem;
};

export const ExpandCell: React.FC<IProps> = ({ item }) => (
  <div className="text-xs flex [grid-area:expand]">
    <SquarePlus
      size={16}
      strokeWidth={1}
      absoluteStrokeWidth
      color="#666"
      className="m-auto cursor-pointer"
    />
  </div>
);
