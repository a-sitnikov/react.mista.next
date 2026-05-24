export type IUser = {
  id: string;
  name: string;
};

export interface ITopicsListItem {
  id: string;
  text: string;
  count: number;
  forum: string;
  section?: string;
  author: IUser;
  updated: string;
  down?: boolean;
  isVoting?: boolean;
  paid?: boolean;
}

export type PollItem = {
  number: number;
  text: string;
  percentage: number;
  votes: number;
};

export type IMessage = {
  n: number;
  user: IUser;
  date: string;
  text: string;
  voting?: {
    text: string;
    variant?: string;
  };
  imgs?: string[];
  poll?: PollItem[];
};

export type ITopic = {
  title: string;
  readers?: IUser[];
  items: IMessage[];
};
