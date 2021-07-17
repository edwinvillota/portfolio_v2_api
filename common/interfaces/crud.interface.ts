export interface CRUD<T, U, V, W> {
  list: (limit: number, page: number) => Promise<T[]>;
  create: (resource: U) => Promise<T>;
  putById: (id: string, resource: V) => Promise<T | null>;
  readById: (id: string) => Promise<T | null>;
  deleteById: (id: string) => Promise<string>;
  patchById: (id: string, resource: W) => Promise<T>;
}