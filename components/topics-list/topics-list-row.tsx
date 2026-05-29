import { ArenaCell } from "./cells/arena-cell";
import { TitleCell } from "./cells/title-cell";
import { CountCell } from "./cells/count-cell";
import { AuthorCell } from "./cells/author-cell";
import { UpdatedCell } from "./cells/updated-cell";
import { ExpandCell } from "./cells/expand-cell";
import { ITopicsListItem } from "@/mista-api/types";
import { SectionCell } from "./cells/section-cell";
import { LastLinkCell } from "./cells/last-link-cell";

interface IProps {
  item: ITopicsListItem;
}

export const TopicsListRow: React.FC<IProps> = ({ item }) => {
  return (
    <div className="c-topics-list-row">
      <ArenaCell item={item} />
      <SectionCell item={item} />
      <ExpandCell item={item} />
      <TitleCell item={item} />
      <CountCell item={item} />
      <AuthorCell item={item} />
      <UpdatedCell item={item} />
      <LastLinkCell item={item} />
    </div>
  );
};
