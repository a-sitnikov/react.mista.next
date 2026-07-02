import { MISTA_DOMAIN } from "@/app/api/constants";
import { IUser } from "@/mista-api/types";
import { ChevronsLeft } from "lucide-react";

interface IProps {
  readers: IUser[];
  collapse: () => void;
}

export const TopicReadersExpanded: React.FC<IProps> = ({
  readers,
  collapse,
}) => (
  <>
    {readers.map((reader) => (
      <a
        key={reader.id}
        href={`${MISTA_DOMAIN}/user/${reader.id}`}
        className="[word-break:break-word] text-muted-foreground hover:text-foreground"
      >
        {reader.name}
      </a>
    ))}
    <button
      onClick={collapse}
      className=" cursor-pointer text-muted-foreground hover:text-foreground"
    >
      <ChevronsLeft className="size-4" />
    </button>
  </>
);
