import { Topic } from "@/components/topic";
import getQueryClient from "@/store/query-hooks";
import { QueryKeys } from "@/store/query-hooks/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function TopicPage({ params }: IProps) {
  const id = (await params).id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.TopicMessages, id],
    queryFn: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/topic/${id}`,
      );

      if (!resp.ok) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }

      return resp.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Topic params={params} />
    </HydrationBoundary>
  );
}
