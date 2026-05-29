"use client";

import { useTopic } from "@/store/query-hooks/use-topic";
import { use, useEffect } from "react";
import { TopicInfo } from "./topic-info";
import { TopicRow } from "./topic-row";

interface IProps {
  params: Promise<{ id: string }>;
}

export default function Topic({ params }: IProps) {
  const { id } = use(params);
  const { data } = useTopic({ id });

  useEffect(() => {
    if (!data) return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const element = document.getElementById(hash);
    if (!element) return;

    element.scrollIntoView({ behavior: "instant" });
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="border md:border-borderOuter">
      <TopicInfo info={data.info} />
      {data.items.map((item) => (
        <TopicRow
          key={item.n}
          item={item}
          topicId={id}
          isAuthor={item.user.id === data.info.author.id}
        />
      ))}
      <div id="F" />
    </div>
  );
}
