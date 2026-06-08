import { ITopicsListItem } from "@/mista-api/types";
import { ChevronRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

type IProps = {
  item: ITopicsListItem;
};

export const LastLinkCell: React.FC<IProps> = ({ item }) => {
  const router = useRouter();

  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const href = `/topic/${item.id}#F`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stop default <Link> navigation
    setPendingHref(href);

    startTransition(() => {
      router.push(href);
    });
  };

  const isThisLinkLoading = isPending && pendingHref === href;

  return (
    <div
      className="hidden max-md:flex 
                items-center justify-center
                [grid-area:lastlink]"
    >
      <Link
        href={`/topic/${item.id}#F`}
        className="text-muted-foreground"
        onClick={handleClick}
      >
        {isThisLinkLoading ? (
          <LoaderCircle strokeWidth={1} className="animate-spin" />
        ) : (
          <ChevronRight strokeWidth={1} />
        )}
      </Link>
    </div>
  );
};
