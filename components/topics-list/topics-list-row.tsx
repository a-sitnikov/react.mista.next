import { ArenaCell } from "./cells/arena-cell";
import { TitleCell } from "./cells/title-cell";
import { CountCell } from "./cells/count-cell";
import { AuthorCell } from "./cells/author-cell";
import { UpdatedCell } from "./cells/updated-cell";
import { ExpandCell } from "./cells/expand-cell";
import { ITopicsListItem } from "@/mista-api/types";
import { SectionCell } from "./cells/section-cell";

interface IProps {
  item: ITopicsListItem;
}

export const TopicsListRow: React.FC<IProps> = ({ item }) => {
  return (
    <div
      className="grid 
      grid-cols-[50px_30px_auto_30px_120px_155px]
      [grid-template-areas:'arena_expand_title_count_author_updated']      
      max-md:grid-cols-[40px_1fr_1fr_20px_40px]
      max-md:[grid-template-areas:'author_author_section_section_section''expand_title_title_title_lastlink''updated_updated_updated_count_count']
      max-md:mb-1.5
      max-md:border max-md:border-borderOuter
      border-b
      bg-background
      "
    >
      <ArenaCell item={item} />
      <SectionCell item={item} />
      <ExpandCell item={item} />
      <TitleCell item={item} />
      <CountCell item={item} />
      <AuthorCell item={item} />
      <UpdatedCell item={item} />
    </div>
  );
};
