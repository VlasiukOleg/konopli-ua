export enum Pages {
  MAIN = "/",
  CATALOG = "catalog",
  PODUSHKI = "gipoallergenni-podushki",
  POSTIL = "postil-konoplyana",
  DITYACHA_POSTIL = "dityacha-postil",
  KOVDRI = "kovdri-i-pledi",
  SHKARPETKI = "shkarpetki-i-ustilki",
  VANNA = "dlya-vannoi",
  KOSMETIKA = "kosmetika",
  BILYZNA = "spidnya-bilyzna",
  CHECKOUT = "checkout",
  POLICY = "policy",
  ABOUT = "about",
  CONTACTS = "contacts",
  DOSTAVKA_OPLATA = "dostavka-i-oplata",
  FAVORITES = "favorites",
}

export const BREADCRUMBS_LABEL = {
  [Pages.CATALOG]: "Каталог",
  [Pages.PODUSHKI]: "Гіпоаллергенні подушки",
  [Pages.CHECKOUT]: "Кошик",
  [Pages.POSTIL]: "Постіль конопляна",
  [Pages.DITYACHA_POSTIL]: "Дитяча постіль",
  [Pages.KOVDRI]: "Ковдри",
  [Pages.SHKARPETKI]: "Шкарпетки та устілки",
  [Pages.VANNA]: "Для ванної",
  [Pages.KOSMETIKA]: "Доглядальна косметика",
  [Pages.BILYZNA]: "Спідня білизна",
  [Pages.POLICY]: "Політика конфіденційності",
  [Pages.ABOUT]: "Про нас",
  [Pages.FAVORITES]: "Список бажань",
};

export const SECTION_TITLE_TEXT_MAP = {
  [Pages.CATALOG]: "Каталог",
  [Pages.PODUSHKI]: "Гіпоаллергенні подушки",
  [Pages.CHECKOUT]: "Кошик",
  [Pages.POSTIL]: "Постіль конопляна",
  [Pages.DITYACHA_POSTIL]: "Натуральні гіпоалергенні дитячі ковдри та подушки з конопляним наповнювачем",
  [Pages.KOVDRI]: "Гіпоалергенні ковдри з конопляним наповнювачем",
  [Pages.SHKARPETKI]: "Шкарпетки та устілки",
  [Pages.VANNA]: "Для ванної",
  [Pages.KOSMETIKA]: "Доглядальна косметика",
  [Pages.BILYZNA]: "Спідня білизна",
  [Pages.POLICY]: "Політика конфіденційності",
  [Pages.ABOUT]: "Про нас",
};

export interface IProductCard {
  id: string;
  category: string[];
  title: string;
  subTitle: string;
  price: string;
  availability: string,
  salePrice: string;
  cover: string;
  filling: string;
  image: string;
  images?: string[];
  description?: string[];
  descriptionTitle?: string[];
  descriptionList?: (string | null)[];
  advantages?: string[];
  care?: string | { title: string; descriptionList: string[] }[];
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
