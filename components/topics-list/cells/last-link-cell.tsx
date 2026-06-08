import { ITopicsListItem } from "@/mista-api/types";
import { ChevronRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

type IProps = {
  item: ITopicsListItem;
};

export const LastLinkCell: React.FC<IProps> = ({ item }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const href = `/topic/${item.id}#F`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stop default <Link> navigation

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div
      className="hidden max-md:flex 
                items-center justify-center
                [grid-area:lastlink]"
    >
      <Link href={href} className="text-muted-foreground" onClick={handleClick}>
        {isPending ? (
          <LoaderCircle strokeWidth={1} className="animate-spin" />
        ) : (
          <ChevronRight strokeWidth={1} />
        )}
      </Link>
    </div>
  );
};
