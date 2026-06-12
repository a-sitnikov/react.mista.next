import { MISTA_DOMAIN } from "@/app/api/constants";
import { IUser } from "@/mista-api/types";

interface IProps {
  readers?: IUser[];
}

export const TopicReaders: React.FC<IProps> = ({ readers }) => {
  if (!readers?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-2 text-sm">
      {readers?.map((r) => (
        <a
          key={r.id}
          href={`${MISTA_DOMAIN}/user/${r.id}`}
          className="[word-break:break-word] text-muted-foreground hover:text-foreground"
        >
          {r.name}
        </a>
      ))}
    </div>
  );
};
