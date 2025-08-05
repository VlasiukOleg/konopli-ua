export enum Pages {
  MAIN = "/",
  CATALOG = "catalog",
  PODUSHKI = "gipoallergenni-podushki",
  CHECKOUT = "checkout",
}

export interface IProductCard {
  id: string;
  category: string[];
  title: string;
  subTitle: string;
  cover: string;
  filling: string;
  image: string;
  images?: string[];
  description?: string[];
  advantages?: string[];
  care?: string;
  tags: string[];
  sizes: {
    key: string;
    label: string;
    price: string;
    salePrice: string;
  }[];
  defaultSize: string;
}
