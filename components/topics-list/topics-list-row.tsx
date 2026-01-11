import { ITopicsListItem } from "@/app/api/topics-list/topics-list.schema";
import { ForumCell } from "./cells/forum-cell";
import { TitleCell } from "./cells/title-cell";
import { CountCell } from "./cells/count-cell";
import { AuthorCell } from "./cells/author-cell";
import { LastUserCell } from "./cells/last-user-cell";
import { ExpandCell } from "./cells/expand-cell";

interface IProps {
  item: ITopicsListItem;
}

export const TopicsListRow: React.FC<IProps> = ({ item }) => {
  return (
    <div
      className="grid 
      grid-cols-[50px_30px_auto_30px_120px_155px] 
      [grid-template-areas:'forum_expand_title_count_author_lastuser']
      border-b
      "
    >
      <ForumCell item={item} />
      <ExpandCell item={item} />
      <TitleCell item={item} />
      <CountCell item={item} />
      <AuthorCell item={item} />
      <LastUserCell item={item} />
    </div>
  );
};
