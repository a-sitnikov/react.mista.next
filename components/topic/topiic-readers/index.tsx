"use client";

import { useState } from "react";
import { IUser } from "@/mista-api/types";
import { TopicReadersExpanded } from "./topic-readers-expaned";

interface IProps {
  readers?: IUser[];
  author: IUser;
}

export const TopicReaders: React.FC<IProps> = ({ readers, author }) => {
  const [expanded, setExpanded] = useState(false);

  if (!readers || !readers.length) {
    return null;
  }

  const authorIsReader = readers.some((reader) => reader.id === author.id);
  const otherReaders = readers.filter((reader) => reader.id !== author.id);
  const count = otherReaders.length;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="mt-2 text-sm">
      <div className="flex flex-wrap items-center gap-x-2">
        <span className="text-muted-foreground">
          Просматривают:{authorIsReader ? " Автор" : ""}
        </span>
        {expanded ? (
          <TopicReadersExpanded
            readers={otherReaders}
            collapse={handleToggle}
          />
        ) : (
          <button
            className="cursor-pointer text-muted-foreground text-nowrap"
            type="button"
            onClick={handleToggle}
          >
            {authorIsReader ? <>+ {count} человек</> : <>{count} человек</>}
          </button>
        )}
      </div>
    </div>
  );
};
