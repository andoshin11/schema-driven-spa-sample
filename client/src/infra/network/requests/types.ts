export const HTTPMethod = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
  put: "PUT"
} as const;

export type TupleToUnion<T> = T extends { [K in keyof T]: infer U } ? U : never;

export interface APIRequest<R> {
  response: R;
  path: string;
  method: TupleToUnion<typeof HTTPMethod>;
  params?: any;
  baseURL?: string;
}
