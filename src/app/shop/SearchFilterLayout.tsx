"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { collections } from "@wix/stores";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFilterLayoutProps {
  collections: collections.Collection[];
  children: React.ReactNode;
}

export default function SearchFilterLayout({
  collections,
  children,
}: SearchFilterLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCollectionsIds = searchParams.getAll("collection");

  function updateFilters(collectionIds: string[]) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("collection");

    collectionIds.forEach((collectionId) => {
      newSearchParams.append("collection", collectionId);
    });

    router.push(`?${newSearchParams.toString()}`);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-5 py-10 lg:flex-row lg:items-start">
      <aside className="h-fit space-y-5 lg:sticky lg:top-10 lg:w-64">
        <div className="space-y-3">
          <div className="font-bold">Collections</div>
          <ul className="space-y-1.5">
            {collections.map((collection) => {
              const collectionId = collection._id;
              if (!collectionId) return null;
              return (
                <li key={collectionId}>
                  <label className="flex cursor-pointer items-center gap-2 font-medium">
                    <Checkbox
                      id={collectionId}
                      checked={selectedCollectionsIds.includes(collectionId)}
                      onCheckedChange={(checked) => {
                        updateFilters(
                          checked
                            ? [...selectedCollectionsIds, collectionId]
                            : selectedCollectionsIds.filter(
                                (id) => id !== collectionId,
                              ),
                        );
                      }}
                    />
                    <span className="line-clamp-1 break-all">
                      {collection.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="w-full max-w-7xl space-y-5">
        <div className="flex justify-center lg:justify-end">sort filter:</div>
        {children}
      </div>
    </main>
  );
}
