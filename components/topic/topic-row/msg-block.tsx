import { twMerge } from "tailwind-merge";
import { IMessage } from "@/mista-api/types";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import PollChart from "./poll-chart";
import { pollVariants } from "../constants";
import { PreviewImage } from "@/components/shared/preview-image";
import { MsgText } from "./msg-text";

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
        {item.voting && (
          <div
            className="font-semibold"
            data-u={item.voting.variant}
            style={{
              color: pollVariants[parseInt(item.voting.variant) - 1].color,
            }}
          >
            {`${item.voting.variant}. ${item.voting.text}`}
          </div>
        )}
        {item.imgs && (
          <div className="flex flex-wrap gap-2 items-start">
            {item.imgs?.map((img, idx) => (
              <PreviewImage
                src={img}
                fullSrc={img.replace("_thumb", "")}
                key={idx}
                className="max-w-full max-h-50 cursor-pointer"
              />
            ))}
          </div>
        )}
      </PhotoProvider>
    </div>
  );
};
