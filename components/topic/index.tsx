"use client";

import { useTopicMessages } from "@/store/query-hooks/use-topic-messages";
import { use, useEffect } from "react";
import { TopicInfo } from "./topic-info";
import { TopicRow } from "./topic-row";

interface IProps {
  params: Promise<{ id: string }>;
}

export const Topic: React.FC<IProps> = ({ params }) => {
  const { id } = use(params);
  const { data } = useTopicMessages({ id });

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
    <div className="md:border md:border-borderOuter mb-10">
      <TopicInfo info={data.info} />
      {data.items.map((item) => (
        <TopicRow
          key={item.n}
          item={item}
          topicId={id}
          isAuthor={item.user.id === data.info.author.id}
          readers={data.info.readers}
        />
      ))}
      <div id="F" />
    </div>
  );
};
