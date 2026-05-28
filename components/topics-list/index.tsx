"use client";

import { TopicsListRow } from "./topics-list-row";
import { TableHeader } from "./table-header";
import { useTopicsList } from "@/store/query-hooks";
import { SelectSection } from "@/components/shared/select-section";
import { Suspense } from "react";
import ModalFrame from "../shared/modal-frame";
import { TablePages } from "./table-pages";

const TopicsList_ = () => {
  const { data, isFetching } = useTopicsList();

  if (!data) {
    return null;
  }

  if (!data.ok) {
    return (
      <ModalFrame title="Ошибка при получении данных" htmlContent={data.text} />
    );
  }

  const items = data.data;

  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className="flex items-center gap-4">
        <SelectSection />
      </div>
      <div className="flex flex-col max-md:gap-1.5">
        <TableHeader isLoading={isFetching} />
        {items.map((item) => (
          <TopicsListRow key={item.id} item={item} />
        ))}
      </div>
      <TablePages />
    </div>
  );
};

export const TopicsList = () => (
  <Suspense fallback={null}>
    <TopicsList_ />
  </Suspense>
);
