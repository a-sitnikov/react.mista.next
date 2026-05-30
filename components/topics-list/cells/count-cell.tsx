import { ITopicsListItem } from "@/mista-api/types";

type IProps = {
  item: ITopicsListItem;
  setExpandedRows: React.Dispatch<React.SetStateAction<Map<string, number>>>;
};

export const CountCell: React.FC<IProps> = ({ item, setExpandedRows }) => {
  const handleClick = () => {
    setExpandedRows((prev) => {
      const newMap = new Map(prev);
      newMap.set(item.id, item.count);
      return newMap;
    });
  };

  return (
    <div
      onClick={handleClick}
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
};
