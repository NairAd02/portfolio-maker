"use client";

import { Pagination } from "@/lib/types/pagination";
import { useState } from "react";

export default function useClientPagination() {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  function clientHandleChangePage(page: number) {
    setPagination((pagination) => ({
      ...pagination,
      page,
    }));
  }

  function clientHandlePageSizeChange(pageSize: number) {
    setPagination((pagination) => ({
      ...pagination,
      page: 1,
      pageSize,
    }));
  }
  return {
    pagination,
    setPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
