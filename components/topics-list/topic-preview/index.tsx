import { useState } from "react";
import { PreviewButtons } from "./preview-buttons";
import { ITopicsListItem } from "@/mista-api/types";
import { PreviewContent } from "./preview-content";
import { useMessageData } from "@/store/query-hooks/use-message-data";
import { isNil } from "@/lib/utils";
import { EmptyContent } from "./empty-content";

interface IProps {
  item: ITopicsListItem;
  initialMsgNumber: number;
  close: () => void;
}

export const TopicPreview: React.FC<IProps> = ({
  item,
  initialMsgNumber,
  close,
}) => {
  const [msgNumber, setMsgNumber] = useState(initialMsgNumber);
  const [prevInitialMsgNumber, setPrevInitialMsgNumber] =
    useState(initialMsgNumber);

  if (initialMsgNumber !== prevInitialMsgNumber) {
    setPrevInitialMsgNumber(initialMsgNumber);
    setMsgNumber(initialMsgNumber);
  }

  const onClickFirst = () => {
    setMsgNumber(0);
  };

  const onClickNext = () => {
    setMsgNumber((prev) => prev + 1);
  };

  const onClickPrev = () => {
    if (msgNumber > 0) {
      setMsgNumber((prev) => prev - 1);
    }
  };

  const onClickLast = async () => {
    setMsgNumber(item.count);
  };

  const { data, isLoading } = useMessageData({ topicId: item.id, msgNumber });

  if (!data && isLoading) return null;

  return (
    <div
      className="flex flex-col gap-2 
                py-2 px-[55px_274px] bg-background max-md:px-2 
                border-b max-md:border-r max-md:border-l max-md:border-borderOuter"
    >
      <PreviewButtons
        topicId={item.id}
        onFirst={onClickFirst}
        onLast={onClickLast}
        onNext={onClickNext}
        onPrev={onClickPrev}
        close={close}
      />
      {isNil(data) ? (
        <EmptyContent />
      ) : (
        <PreviewContent topic={item} data={data} msgNumber={msgNumber} />
      )}
    </div>
  );
};
