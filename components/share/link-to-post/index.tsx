interface IProps {
  topicId: string;
  n: number;
}

export const LinkToPost: React.FC<IProps> = ({ topicId, n }) => {
  return <span className="cursor-pointer text-linkColor">{n}</span>;
};
