export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
};

export type PaginatedResponse<T> = ApiResponse<T> & {
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
