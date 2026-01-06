"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { ITopicsListItem } from "../../api/schemas";
import { useSearchParams } from "next/navigation";

export const useTopicsList = () => {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<ITopicsListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTopics = useEffectEvent(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "/api/topics-list?" + searchParams.toString()
      );
      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchTopics();
  }, [searchParams]);

  return { items, loading };
};
