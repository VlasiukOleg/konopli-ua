export enum Pages {
  MAIN = "/",
  CATALOG = "catalog",
  PODUSHKI = "gipoallergenni-podushki",
  POSTIL = "postil-konoplyana",
  KOVDRI = "kovdri-i-pledi",
  SHKARPETKI = "shkarpetki-i-ustilki",
  CHECKOUT = "checkout",
}

export const BREADCRUMBS_LABEL = {
  [Pages.CATALOG]: "Каталог",
  [Pages.PODUSHKI]: "Гіпоаллергенні подушки",
  [Pages.CHECKOUT]: "Кошик",
  [Pages.POSTIL]: "Постіль конопляна",
  [Pages.KOVDRI]: "Ковдри та пледи",
  [Pages.SHKARPETKI]: "Шкарпетки та устілки",
};

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
    package?: string[] | null;
  }[];
  defaultSize: string;
}
