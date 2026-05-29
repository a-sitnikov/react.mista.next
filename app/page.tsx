import { TopicsList } from "@/components/topics-list";
import getQueryClient from "@/store/query-hooks";
import { QueryKeys } from "@/store/query-hooks/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface IProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function TopicsListPage({ searchParams }: IProps) {
  const queryClient = getQueryClient();
  const page = (await searchParams).page;

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.TopicsList, page, undefined, undefined],
    queryFn: async () => {
      const newSearchParams = new URLSearchParams();
      if (page) newSearchParams.set("page", page);

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/topics-list?${newSearchParams.toString()}`,
      );

      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopicsList />
    </HydrationBoundary>
  );
}
