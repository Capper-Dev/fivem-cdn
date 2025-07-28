export interface ImageFile {
  id: string;
  name: string;
  url: string;
  category: ImageCategory;
  size: number;
  lastModified: Date;
  dimensions?: {
    width: number;
    height: number;
  };
}

export type ImageCategory = 'vehicles' | 'items' | 'other' | 'loadingscreen' | 'maps';

export interface FilterState {
  search: string;
  category: ImageCategory | 'all';
  sortBy: 'name' | 'size' | 'date';
  sortOrder: 'asc' | 'desc';
}