interface IProps extends React.PropsWithChildren {
  href: string;
  parentText: string;
}

export const CustomLink: React.FC<IProps> = ({ href, children }) => {
  return <a href={href}>{children}</a>;
};
