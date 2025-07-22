import { SearchParamsPagination } from "./types/pagination";
import { IQueryable } from "./types/request";


export class QueryParamsURLFactory {
  private query: IQueryable;

  private baseUrl?: string;

  constructor(query: IQueryable, baseUrl?: string) {
    this.query = query;
    this.baseUrl = baseUrl;
  }

  build(): string {
    const queryParams = new URLSearchParams();
    const { filters, pagination, search, sorts, ...rest } = this.query;
    // Add filters
    if (filters) {
      filters?.forEach((filter) => {
        queryParams.append(
          "filters",
          `${filter.field},${filter.op ?? "eq"},${filter.value}`
        );
      });
    }

    // Add sorts
    if (sorts?.length) {
      queryParams.append(
        "_sort",
        sorts
          .map((sort) => `${sort.field}:${sort.isAsc ? "ASC" : "DESC"}`)
          .join(",")
      );
    }

    // Add pagination
    if (pagination) {
      const { perPage, page } = pagination;
      queryParams.append("limit", perPage.toString());
      queryParams.append("page", ((page - 1) * perPage).toString());
    } else {
      queryParams.append("page", "1");
      queryParams.append("limit", "5");
    }

    // Add search
    if (search) queryParams.append(`_q`, search);

    if (rest) {
      Object.keys(rest).forEach((key) => {
        if (Array.isArray(rest[key])) {
          rest[key].forEach((value: string) => {
            queryParams.append(key, value);
          });
        } else {
          queryParams.append(key, rest[key]);
        }
      });
    }

    // Generate complete URL if baseUrl is provided
    if (this.baseUrl) {
      const url = new URL(this.baseUrl);
      url.search = queryParams.toString();
      return url.toString();
    }

    return queryParams.toString();
  }
}

export const buildQueryParams = (
  params?: SearchParamsPagination
): IQueryable => {
  const { page, perPage, search, sort } = params || {
    page: 1,
    perPage: 10,
    search: undefined,
  };

  const sortList = [];
  if (typeof sort === "object") {
    sort.forEach((s) => {
      const [field, order] = s.split(",");
      sortList.push({ field, isAsc: order === "asc" });
    });
  }
  if (typeof sort === "string") {
    const [field, order] = sort.split(",");
    sortList.push({ field, isAsc: order === "asc" });
  }
  const query: IQueryable = {
    pagination: {
      page: page ? Number(page) : 1,
      perPage: perPage ? +perPage : 10,
    },
    search,
    sorts: sortList,
  };

  return query;
};
