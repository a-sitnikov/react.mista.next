import { useEffect, useEffectEvent, useState } from "react";
import { MsgTooltipBody } from "./msg-tooltip-body";
import { MsgTooltipHeader } from "./msg-tooltip-header";
import { getCachedTopicData } from "@/store/query-hooks/use-topic-messages";
import { useQueryClient } from "@tanstack/react-query";
import { IMessage } from "@/mista-api/types";
import { fetchMessage } from "@/app/api/utils";

interface IProps {
  topicId: string;
  n: number;
  headerRef?: React.Ref<HTMLDivElement>;
}

export const MsgTooltipContent: React.FC<IProps> = ({
  topicId,
  n,
  headerRef,
}) => {
  const [item, setItem] = useState<IMessage>();

  const queryClient = useQueryClient();

  const getTopicData = useEffectEvent(async () => {
    const topicData = getCachedTopicData(queryClient, topicId);

    if (topicData) {
      return topicData?.items.find((val) => val.n === n);
    } else {
      return fetchMessage(topicId, String(n));
    }
  });

  useEffect(() => {
    getTopicData().then((itemN) => {
      if (!itemN) {
        setItem({
          text: "Message not found",
          user: { id: "", name: "" },
          n,
          date: "",
        });
      } else {
        setItem(itemN);
      }
    });
  }, [topicId, n]);

  return (
    <>
      <MsgTooltipHeader ref={headerRef} item={item} />
      <MsgTooltipBody item={item} topicId={topicId} />
    </>
  );
};
