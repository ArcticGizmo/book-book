export interface WishlistItem {
  name: string;
  url?: string;
  brand?: string;
  notes?: string;
  tags?: string[];
  src?: string;
  price?: number;
  rating?: number;
}

export enum SortType {
  'number' = 'number',
  'string' = 'string'
}

export interface SortFilterOption {
  name: string;
  type: SortType;
}

export interface SortFilterConfig {
  sortBy: string;
  sortAsc: boolean;
  sortType: SortType;
}

export interface NewBook {
  title: string;
  cover?: string;
  author?: string;
  series?: string;
  seriesNumber?: string;
  pages?: number;
  rating?: number;
}

export interface Book extends NewBook {
  id: string;
}
