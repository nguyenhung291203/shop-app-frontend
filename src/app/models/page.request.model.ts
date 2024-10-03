export interface PageRequest {
  keyword: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_dir: string;
}

export interface PageProductRequest extends PageRequest {
  category_id: number | null;
}

export interface PageOrderRequest extends PageRequest {
  user_id?: number;
  status?: string|null;
  start_date?: Date;
  end_date?: Date;
}
