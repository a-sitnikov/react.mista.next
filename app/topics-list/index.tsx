"use client";

import Link from "next/link";
import { useTopicsList } from "./hooks/use-topics-list";

export default function TopicsList() {
  const { items } = useTopicsList();

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <Link href={`/topic/${item.id}`}>{item.text}</Link>
        </div>
      ))}
    </div>
  );
}
