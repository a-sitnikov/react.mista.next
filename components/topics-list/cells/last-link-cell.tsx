import { ITopicsListItem } from "@/mista-api/types";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type IProps = {
  item: ITopicsListItem;
};

export const LastLinkCell: React.FC<IProps> = ({ item }) => (
  <div className="[grid-area:lastlink]">
    <Link
      href={`/topic/${item.id}#F`}
      style={{
        color: "inherit",
        display: "block",
        width: "100%",
        textAlign: "center",
      }}
    >
      <ChevronsRight />
    </Link>
  </div>
);
