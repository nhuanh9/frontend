import {Category} from './category';

export interface House {
  id?: string;
  name?: string;
  category?: Category;
  address?: string;
  createDay?: string;
  theMostNearEditDay?: string;
  imageUrls?: string;
}
