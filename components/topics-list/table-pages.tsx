import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

export const TablePages = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: 5 }).map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={page === 1 ? "/" : `/?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
