import { ITopicsListItem } from "@/mista-api/types";
import { SquareMinus, SquarePlus } from "lucide-react";

type IProps = {
  item: ITopicsListItem;
  expanded: boolean;
  setExpandedRows: React.Dispatch<React.SetStateAction<Map<string, number>>>;
};

export const ExpandCell: React.FC<IProps> = ({
  item,
  expanded,
  setExpandedRows,
}) => {
  const handleClick = () => {
    if (expanded) {
      setExpandedRows((prev) => {
        const newMap = new Map(prev);
        newMap.delete(item.id);
        return newMap;
      });
    } else {
      setExpandedRows((prev) => {
        const newMap = new Map(prev);
        newMap.set(item.id, 0);
        return newMap;
      });
    }
  };

  return (
    <div
      className="text-xs flex 
                max-md:border-r
                [grid-area:expand]"
      onClick={handleClick}
    >
      {expanded ? (
        <SquareMinus
          strokeWidth={1}
          absoluteStrokeWidth
          className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground"
        />
      ) : (
        <SquarePlus
          strokeWidth={1}
          absoluteStrokeWidth
          className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground"
        />
      )}
    </div>
  );
};
