"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationBarProps {
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar({
  currentPage,
  totalPage,
}: PaginationBarProps) {
  const searchParams = useSearchParams();

  function getLink(page: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  }

  if (totalPage <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getLink(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPage }).map((_, i) => {
          const page = i + 1;
          const isEdgePage = page === 1 || page === totalPage;
          const isNearCurrentPage = Math.abs(page - currentPage) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            if (i === 1 || i === totalPage - 2) {
              return (
                <PaginationItem key={page} className="hidden md:block">
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }

            return null;
          }

          return (
            <PaginationItem
              key={page}
              className={cn(
                "hidden md:block",
                page === currentPage && "pointer-events-none block",
              )}
            >
              <PaginationLink
                href={getLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={getLink(currentPage + 1)}
            className={cn(
              currentPage >= totalPage &&
                "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
