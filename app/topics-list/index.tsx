"use client";

import { TopicsListRow } from "./components/topics-list-row";
import { TableHeader } from "./components/table-header";
import { useTopicsList } from "@/store/query-hooks";
import { SelectSection } from "@/components/share/select-section";

export default function TopicsList() {
  const { data: items, isFetching } = useTopicsList();

  if (!items) {
    return null;
  }

  return (
    <div>
      <SelectSection />
      <TableHeader isLoading={isFetching} />
      {items.map((item) => (
        <TopicsListRow key={item.id} item={item} />
      ))}
    </div>
  );
}
