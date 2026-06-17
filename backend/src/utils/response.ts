export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => ({
  status: 'success',
  message,
  data,
});

export const errorResponse = (message: string, error?: string): ApiResponse => ({
  status: 'error',
  message,
  error,
});
