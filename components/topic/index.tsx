"use client";

import { useTopic } from "@/store/query-hooks/use-topic-messages";
import { use } from "react";
import { TopicInfo } from "./topic-info";
import { TopicRow } from "./topic-row";

interface IProps {
  params: Promise<{ id: string }>;
}

export default function Topic({ params }: IProps) {
  const { id } = use(params);
  const { data } = useTopic({ id });

  if (!data) {
    return null;
  }

  return (
    <div className="border">
      <TopicInfo info={data.info} />
      {data.items.map((item) => (
        <TopicRow
          key={item.n}
          item={item}
          topicId={id}
          isAuthor={item.userId === data.info.authorId}
        />
      ))}
    </div>
  );
}
