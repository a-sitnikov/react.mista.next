"use client";

import { TopicsListRow } from "./topics-list-row";
import { TableHeader } from "./table-header";
import { useTopicsList } from "@/store/query-hooks";
import { SelectSection } from "@/components/shared/select-section";
import { Suspense, useState } from "react";
import ModalFrame from "../shared/modal-frame";
import { TablePages } from "./table-pages";
import { useParams, useSearchParams } from "next/navigation";
import { TopicPreview } from "./topic-preview";
import { isNil } from "@/lib/utils";

const TopicsList_ = () => {
  const { section, arena } = useParams<{ section?: string; arena?: string }>();
  const searchParams = useSearchParams();

  const [expandedRows, setExpandedRows] = useState<Map<string, number>>(
    new Map(),
  );

  const { data, isFetching } = useTopicsList({
    page: searchParams.get("page") ?? undefined,
    arena,
    section,
  });

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
      <div
        className="flex flex-col 
                  md:border border-borderOuter
                  max-md:gap-1.5"
      >
        <TableHeader isLoading={isFetching} />
        {items.map((item) => {
          const expandedMsgNumber = expandedRows.get(item.id);
          return (
            <div key={item.id}>
              <TopicsListRow
                item={item}
                expanded={!isNil(expandedMsgNumber)}
                setExpandedRows={setExpandedRows}
              />
              {!isNil(expandedMsgNumber) && (
                <TopicPreview
                  key={expandedMsgNumber}
                  item={item}
                  initialMsgNumber={expandedMsgNumber}
                  close={() =>
                    setExpandedRows((prev) => {
                      const newMap = new Map(prev);
                      newMap.delete(item.id);
                      return newMap;
                    })
                  }
                />
              )}
            </div>
          );
        })}
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
