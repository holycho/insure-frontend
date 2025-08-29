import { Award } from 'app/bff/models/news/detail';
import { Winner } from 'app/bff/models/promo/detail';

export interface TextCollectionTableProps {
  id: string;
  title: string;
  order: number;
  head: string[];
  awards: Award[];
  winners: Winner[];
}
