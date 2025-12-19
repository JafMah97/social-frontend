import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION // or VITE_PRODUCTION
    : process.env.NEXT_PUBLIC_DEVELOPMENT; // or VITE_DEVELOPMENT

const api = axios.create({
  baseURL,
  timeout: 60 * 1000,
});

interface RequestOptions {
  withCredentials?: boolean;
  headers?: Record<string, string>;
}

// GET
export async function getRequest<T>(
  endPoint: string,
  options?: RequestOptions
): Promise<T> {
  const response = await api.get<T>(endPoint, {
    withCredentials: options?.withCredentials ?? false,
    headers: {
      ...options?.headers},
  });
  return response.data;
}

// POST
export async function postRequest<T, S>(
  endPoint: string,
  data?: S,
  options?: RequestOptions
): Promise<T> {
  const response = await api.post<T>(endPoint, data, {
    withCredentials: options?.withCredentials ?? false,
    headers: {
      ...options?.headers
    },
  });
  return response.data;
}

// PUT
export async function putRequest<T, S>(
  endPoint: string,
  data?: S,
  options?: RequestOptions
): Promise<T> {
  const response = await api.put<T>(endPoint, data, {
    withCredentials: options?.withCredentials ?? false,
    headers: {
      ...options?.headers
    },
  });
  return response.data;
}

// PATCH
export async function patchRequest<T, S>(
  endPoint: string,
  data?: S,
  options?: RequestOptions
): Promise<T> {
  const response = await api.patch<T>(endPoint, data, {
    withCredentials: options?.withCredentials ?? false,
    headers: {
      ...options?.headers
    },
  });
  return response.data;
}

// DELETE
export async function deleteRequest<T>(
  endPoint: string,
  options?: RequestOptions
): Promise<T> {
  const response = await api.delete<T>(endPoint, {
    withCredentials: options?.withCredentials ?? false,
    headers: {
      ...options?.headers
    },
  });
  return response.data;
}
