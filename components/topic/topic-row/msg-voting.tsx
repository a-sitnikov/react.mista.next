import { IVoting } from "@/mista-api/types";
import { pollVariants } from "../constants";

interface IProps {
  voting: IVoting;
}

export const MsgVoting: React.FC<IProps> = ({ voting }) => {
  const color = pollVariants[parseInt(voting.variant) - 1].color;

  return (
    <div
      className="font-semibold"
      data-u={voting.variant}
      style={{
        color,
      }}
    >
      {`${voting.variant}. ${voting.text}`}
    </div>
  );
};
