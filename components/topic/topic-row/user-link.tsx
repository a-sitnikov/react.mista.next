import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface IProps {
  id: string;
  name: string;
  isAuthor: boolean;
  className?: string;
}

export const UserLink: React.FC<IProps> = ({
  id,
  name,
  isAuthor,
  className,
}) => {
  return (
    <Link
      href={`/user/${id}`}
      className={twMerge(
        "font-bold px-1 text-foreground break-all",
        isAuthor && "bg-amber-400 rounded-xs",
        className
      )}
    >
      {name}
    </Link>
  );
};
