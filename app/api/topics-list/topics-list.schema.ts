export interface ITopicsListItem {
  id: string;
  text: string;
  count: number;
  forum: string;
  section: string;
  author: string;
  authorId: string;
  updated: string;
  down?: boolean;
  isVoting?: boolean;
  paid?: boolean;
}
