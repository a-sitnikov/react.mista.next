"use client";

import { use } from "react";
import { useTopic } from "../hooks/use-topic";

interface IProps {
  params: Promise<{ id: string }>;
}

export default function Topic({ params }: IProps) {
  const { id } = use(params);
  const { info } = useTopic({ id });

  return <div>{JSON.stringify(info)}</div>;
}
