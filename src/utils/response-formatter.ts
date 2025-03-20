export interface Paging {
  currentPage: number;
  totalPage: number;
  size: number;
  totalData: number;
}

export interface Response {
  status: boolean;
  message: string;
  data?: object | any[] | null; // Allow data to be an object, array, or null
  paging?: Paging | null; // Allow paging to be optional or null
}

export function successResponse(
  message: string = 'Ok',
  data: object | any[] | null, // Accept data as an object or an array
  paging?: Paging,
): Response {
  const response: Response = {
    status: true,
    message,
    data,
  };

  if (paging) {
    response.paging = paging;
  }

  return response;
}

export function errorResponse(
  message: string,
  data: object | any[] | null = null, // Allow optional data for error responses
): Response {
  return {
    status: false,
    message,
    data,
    paging: null, // Explicitly set paging to null for error responses
  };
}
