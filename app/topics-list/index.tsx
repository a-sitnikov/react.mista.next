"use client";

import { useTopicsList } from "./hooks/use-topics-list";
import { TopicsListRow } from "./components/topics-list-row";
import { TableHeader } from "./components/table-header";

export default function TopicsList() {
  const { items } = useTopicsList();

  return (
    <div>
      <TableHeader />
      {items.map((item) => (
        <TopicsListRow key={item.id} item={item} />
      ))}
    </div>
  );
}
