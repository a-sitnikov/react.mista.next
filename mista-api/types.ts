export type IUser = {
  id: string;
  name: string;
};

export interface ITopicsListItem {
  id: string;
  text: string;
  count: number;
  arena: string;
  section?: string;
  author: IUser;
  updated: string;
  down?: boolean;
  closed?: boolean;
  isVoting?: boolean;
  paid?: boolean;
}

export type IPollItem = {
  number: number;
  text: string;
  percentage: number;
  votes: number;
};

export type IVoting = {
  text: string;
  variant: string;
};

export type IMessage = {
  n: number;
  user: IUser;
  date: string;
  text: string;
  voting?: IVoting;
  imgs?: string[];
  poll?: IPollItem[];
};

export type ITopicInfo = {
  id: string;
  title: string;
  author: IUser;
  readers?: IUser[];
};

export type ITopic = {
  info: ITopicInfo;
  items: IMessage[];
};

export type ISection = {
  code: string;
  arena: string;
  name: string;
};
