export interface Page<T> {
  contents: T[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
