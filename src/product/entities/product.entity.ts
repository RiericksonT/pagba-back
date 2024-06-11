import { Category, Image } from '@prisma/client';

export class Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: Category;
  images: Image[];
}
