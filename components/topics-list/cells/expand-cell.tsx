import { ITopicsListItem } from "@/mista-api/types";
import { LoaderCircle, SquareMinus, SquarePlus } from "lucide-react";

type IProps = {
  item: ITopicsListItem;
  expanded: boolean;
  isLoading: boolean;
  setExpandedMsgNumber: (msgNumber: number | undefined) => void;
};

export const ExpandCell: React.FC<IProps> = ({
  expanded,
  isLoading,
  setExpandedMsgNumber,
}) => {
  const handleClick = () => {
    if (expanded) {
      setExpandedMsgNumber(undefined);
    } else {
      setExpandedMsgNumber(0);
    }
  };

  return (
    <div
      className="text-xs flex 
                max-md:border-r
                [grid-area:expand]"
      onClick={handleClick}
    >
      {(() => {
        if (isLoading) {
          return (
            <LoaderCircle
              strokeWidth={1}
              absoluteStrokeWidth
              className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground animate-spin"
            />
          );
        } else if (expanded) {
          return (
            <SquareMinus
              strokeWidth={1}
              absoluteStrokeWidth
              className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground"
            />
          );
        } else {
          return (
            <SquarePlus
              strokeWidth={1}
              absoluteStrokeWidth
              className="m-auto cursor-pointer size-4 max-md:size-5 text-muted-foreground"
            />
          );
        }
      })()}
    </div>
  );
};
