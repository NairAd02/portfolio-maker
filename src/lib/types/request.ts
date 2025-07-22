export type ITableFilters = {
    search: string
    startDate: Date | null
    endDate: Date | null
    status: string
}

export type ITableFilterValue = string | string[] | Date | null

export type IFilterOperator =
    | 'eq'
    | 'neq'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'like'

export type IFilter = {
    field: string
    value: string | Date | number | boolean
    op?: IFilterOperator
}

export type ISort = {
    field: string
    isAsc: boolean
}

export type IPagination = {
    page: number
    perPage: number
}

export type IQueryable = {
    filters?: IFilter[]
    sorts?: ISort[]
    pagination?: IPagination
    search?: string
} & Record<string, any>
