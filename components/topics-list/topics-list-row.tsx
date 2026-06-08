import { ArenaCell } from "./cells/arena-cell";
import { TitleCell } from "./cells/title-cell";
import { CountCell } from "./cells/count-cell";
import { AuthorCell } from "./cells/author-cell";
import { UpdatedCell } from "./cells/updated-cell";
import { ExpandCell } from "./cells/expand-cell";
import { ITopicsListItem } from "@/mista-api/types";
import { SectionCell } from "./cells/section-cell";
import { LastLinkCell } from "./cells/last-link-cell";
import { useMessageData } from "@/store/query-hooks/use-message-data";
import { useState } from "react";
import { TopicPreview } from "./topic-preview";
import { isNil } from "@/lib/utils";

interface IProps {
  item: ITopicsListItem;
}

export const TopicsListRow: React.FC<IProps> = ({ item }) => {
  const [expandedMsgNumber, setExpandedMsgNumber] = useState<
    number | undefined
  >(undefined);

  const { isLoading, isFetching, data } = useMessageData(
    {
      topicId: item.id,
      msgNumber: expandedMsgNumber,
    },
    { enabled: expandedMsgNumber !== undefined },
  );

  return (
    <div>
      <div className="c-topics-list-row sticky top-[80px] max-md:top-14">
        <ArenaCell item={item} />
        <SectionCell item={item} />
        <ExpandCell
          item={item}
          expanded={!isNil(expandedMsgNumber)}
          isLoading={isLoading || isFetching}
          setExpandedMsgNumber={setExpandedMsgNumber}
        />
        <TitleCell item={item} />
        <CountCell item={item} setExpandedMsgNumber={setExpandedMsgNumber} />
        <AuthorCell item={item} />
        <UpdatedCell item={item} />
        <LastLinkCell item={item} />
      </div>
      {!isNil(expandedMsgNumber) && !isNil(data) && (
        <TopicPreview
          item={item}
          initialMsgNumber={expandedMsgNumber}
          close={() => setExpandedMsgNumber(undefined)}
        />
      )}
    </div>
  );
};
