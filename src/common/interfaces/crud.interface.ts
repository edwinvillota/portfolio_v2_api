export interface CRUD<Model, CreateType, PutType, PatchType> {
  list(limit: number, page: number): Promise<Model[]>;
  create(resource: CreateType): Promise<Model>;
  putById(id: string, resource: PutType): Promise<Model | null>;
  readById(id: string): Promise<Model | null>;
  deleteById(id: string): Promise<string>;
  patchById(id: string, resource: PatchType): Promise<Model | null>;
}
