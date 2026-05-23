export interface ITopicsListItem {
  id: string;
  text: string;
  count: number;
  forum: string;
  section?: string;
  author: string;
  authorId: string;
  updated: string;
  down?: boolean;
  isVoting?: boolean;
  paid?: boolean;
}

export type IMessage = {
  n: number;
  user: string;
  userId: string;
  date: string;
  text: string;
  voting?: {
    text: string;
    variant?: string;
  };
  imgs?: string[];
};
