"use client";

import { useTopicsList } from "./hooks/use-topics-list";

export default function TopicsList() {
  const { items } = useTopicsList();

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
