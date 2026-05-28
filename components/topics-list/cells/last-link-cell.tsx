import { ITopicsListItem } from "@/mista-api/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type IProps = {
  item: ITopicsListItem;
};

export const LastLinkCell: React.FC<IProps> = ({ item }) => (
  <div
    className="hidden max-md:flex 
                items-center justify-center
                [grid-area:lastlink]"
  >
    <Link href={`/topic/${item.id}#F`} className="text-muted-foreground">
      <ChevronRight strokeWidth={1} />
    </Link>
  </div>
);
