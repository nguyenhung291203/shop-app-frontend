
export interface PageRequest {
  keyword: string;
  page: number;
  limit:number;
  sort_by: string;
  sort_dir: string;
}

export interface PageProductRequest extends PageRequest {
  category_id: number | null;
}
