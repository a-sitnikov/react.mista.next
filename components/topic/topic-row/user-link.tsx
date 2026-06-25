import { MISTA_DOMAIN } from "@/app/api/constants";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface IProps {
  id: string;
  name: string;
  isAuthor: boolean;
  online: boolean;
  className?: string;
}

export const UserLink: React.FC<IProps> = ({
  id,
  name,
  isAuthor,
  className,
  online,
}) => {
  return (
    <Link
      href={`${MISTA_DOMAIN}/user/${id}`}
      className={twMerge(
        "font-bold px-1 text-foreground break-all",
        isAuthor && "bg-amber-400 dark:bg-yellow-900 rounded-xs",
        className,
      )}
      prefetch={false}
    >
      <span className="inline-flex items-center gap-1">
        <span>{name}</span>
        {online && (
          <span
            className="h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-black"
            aria-hidden
          />
        )}
      </span>
    </Link>
  );
};
