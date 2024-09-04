import { Param } from '../models';

export function generateParam(param: Param): string {
  const { page = 1, limit = 5, sortBy = 'id', sortDir = 'asc' } = param;

  const encodedPage = encodeURIComponent(page);
  const encodedLimit = encodeURIComponent(limit);
  const encodedSortBy = encodeURIComponent(sortBy);
  const encodedSortDir = encodeURIComponent(sortDir);

  return `page=${encodedPage}&limit=${encodedLimit}&sortBy=${encodedSortBy}&sortDir=${encodedSortDir}`;
}
