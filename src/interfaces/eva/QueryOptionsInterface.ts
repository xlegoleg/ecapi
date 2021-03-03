declare interface IQueryOptions {
  page: number;
  perPage: number;
  query?: string;
  sort?: string;
}

export default IQueryOptions;