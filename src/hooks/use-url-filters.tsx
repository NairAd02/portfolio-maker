"use client";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useUrlFilters() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const debouncedUpdateFiltersInUrl = useMemo(
    () =>
      debounce((updatedFilters: object) => {
        const searchUrl = new URLSearchParams(searchParams);
        Object.entries(updatedFilters).forEach(([key, value]) => {
          if (value !== undefined) {
            if (typeof value === "number") searchUrl.set(key, value.toString());
            else if (typeof value === "boolean")
              searchUrl.set(key, value ? "true" : "false");
            else if (Array.isArray(value)) {
              value.forEach(() => {
                searchUrl.delete(key);
              });
              value.forEach((value) => {
                searchUrl.append(key, value);
              });
            } else searchUrl.set(key, value);
          } else searchUrl.delete(key);
        });
        replace(
          Object.keys(updatedFilters).length > 0
            ? `${pathname}?${searchUrl.toString()}`
            : pathname
        );
      }, 300),
    [searchParams, pathname, replace]
  );

  const updateFiltersInUrl = useCallback(
    (updatedFilters: object) => {
      debouncedUpdateFiltersInUrl(updatedFilters);
    },
    [debouncedUpdateFiltersInUrl]
  );

  return { updateFiltersInUrl };
}
