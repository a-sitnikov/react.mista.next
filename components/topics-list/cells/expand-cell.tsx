import { ITopicsListItem } from "@/mista-api/types";
import { SquarePlus } from "lucide-react";

type IProps = {
  item: ITopicsListItem;
};

export const ExpandCell: React.FC<IProps> = ({ item }) => (
  <div
    className="text-xs flex 
                max-md:border-r
                [grid-area:expand]"
  >
    <SquarePlus
      strokeWidth={1}
      absoluteStrokeWidth
      className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground"
    />
  </div>
);
