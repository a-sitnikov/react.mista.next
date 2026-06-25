import { twMerge } from "tailwind-merge";
import { IMessage } from "@/mista-api/types";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import PollChart from "./poll-chart";
import { MsgText } from "./msg-text";
import { MsgImgs } from "./msg-imgs";
import { MsgVoting } from "./msg-voting";

interface IProps {
  item: IMessage;
  topicId: string;
  className?: string;
}

export const MsgBlock: React.FC<IProps> = ({ item, topicId, className }) => {
  return (
    <div
      className={twMerge("flex flex-col gap-2 p-3 overflow-hidden", className)}
    >
      <PhotoProvider>
        {item.poll && <PollChart items={item.poll} />}
        {item.text && <MsgText text={item.text} topicId={topicId} />}
        {item.voting && <MsgVoting voting={item.voting} />}
        {item.imgs && <MsgImgs imgs={item.imgs} />}
      </PhotoProvider>
    </div>
  );
};
