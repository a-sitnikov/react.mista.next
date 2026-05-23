"use client";

import { TopicsListRow } from "./topics-list-row";
import { TableHeader } from "./table-header";
import { useTopicsList } from "@/store/query-hooks";
import { SelectSection } from "@/components/shared/select-section";
import { Suspense } from "react";

const TopicsList_ = () => {
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
};

export const TopicsList = () => (
  <Suspense fallback={null}>
    <TopicsList_ />
  </Suspense>
);
