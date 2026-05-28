import { IPollItem } from "@/mista-api/types";
import { PollItem } from "./poll-item";
import { pollVariants } from "../constants";

type IProps = {
  items: IPollItem[];
};

const PollChart: React.FC<IProps> = ({ items }) => {
  const maxPercentage = Math.max(...items.map((item) => item.percentage));

  return (
    <ul className="flex flex-col gap-0 max-md:gap-2 mb-3">
      {items.map((item, i) => (
        <PollItem
          key={i}
          item={item}
          vartiant={pollVariants[i % pollVariants.length]}
          imgWidth={
            maxPercentage > 0 ? (item.percentage / maxPercentage) * 100 : 0
          }
        />
      ))}
    </ul>
  );
};

export default PollChart;
