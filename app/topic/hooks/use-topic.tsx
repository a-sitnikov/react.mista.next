"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { ITopicInfo } from "@/app/api/topic/topic.schema";

interface IProps {
  id: string;
}

export const useTopic = ({ id }: IProps) => {
  const [info, setInfo] = useState<ITopicInfo | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchTopic = useEffectEvent(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/topic/${id}`);
      const data = await response.json();
      setInfo(data.info);
    } catch (error) {
      console.error("Failed to fetch topic:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchTopic();
  }, [id]);

  return { info, loading };
};
