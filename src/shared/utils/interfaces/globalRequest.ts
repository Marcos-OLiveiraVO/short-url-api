export interface CompareHashInput {
  password: string;
  hash: string;
}

export interface GlobalRequest extends Request {
  user: { profileId: number };
}

export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  totalItemsOnThisPage: number;
  limitPerPage: number;
}

export interface Pagination<T> {
  data: T[];
  metadata: PaginationMetadata;
}

export interface BasePagination {
  page?: number;
  limit?: number;
}

export interface loggerInput {
  level: string;
  message: string;
  context?: Record<string, any>;
}

export interface RequestWithId extends Request {
  id: string;
}

export interface ResponseWithStatusCode extends Response {
  statusCode: number;
}
