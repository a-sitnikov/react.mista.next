import { useEffect, useEffectEvent, useState } from "react";
import { MsgTooltipBody } from "./msg-tooltip-body";
import { MsgTooltipHeader } from "./msg-tooltip-header";
import { getCachedTopicData } from "@/store/query-hooks/use-topic";
import { useQueryClient } from "@tanstack/react-query";
import { IMessage } from "@/mista-api/types";

interface IProps {
  topicId: string;
  n: number;
  close: () => void;
}

export const MsgTooltipContent: React.FC<IProps> = ({ topicId, n, close }) => {
  // const [info, setInfo] = useState<ITopicInfo>();
  // const [item, setItem] = useState<IMessage>();

  const queryClient = useQueryClient();

  // const getTopicData = useEffectEvent(() => {
  //   const topicData = getCachedTopicData(queryClient, topicId);
  //   if (!topicData) {
  //     return;
  //   }

  //   setInfo(topicData.info);

  //   const itemN = topicData.items.find((val) => val.n === n);
  //   setItem(itemN);
  // });

  useEffect(() => {
    //getTopicData();
  }, [topicId, n]);

  return (
    <div>
      {/* <MsgTooltipHeader close={close} item={item} />
      <MsgTooltipBody item={item} topicId={topicId} /> */}
    </div>
  );
};
