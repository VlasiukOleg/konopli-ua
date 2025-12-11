"use client";

export const seasons = [
  { key: "all", label: "Всі" },
  { key: "summer", label: "Літні ковдри" },
  { key: "demi", label: "Демісезонні ковдри" },
  { key: "winter", label: "Зимові ковдри" },
];

export const covers = [
  { key: "all", label: "Всі" },
  { key: "Сатин", label: "Сатин" },
  { key: "Бавовна", label: "Бавовна" },
  { key: "Конопляна тканина", label: "Конопляна тканина" },
];

import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button, Select, SelectItem } from "@heroui/react";

import ProductCard from "@/components/ui/ProductCard/ProductCard";
import BlanketAlert from "@/components/common/BlanketAlert";

import { useAlert } from "@/store/alert";

import { IoHomeOutline } from "react-icons/io5";
import productList from "@/data/productList.json";

import {
  Pages,
  BREADCRUMBS_LABEL,
  SECTION_TITLE_TEXT_MAP,
} from "@/@types/index";

interface IProductListProps {
  product: string;
}

const ProductList: React.FC<IProductListProps> = ({ product }) => {
  const isAlertShow = useAlert((state) => state.isAlertShow);

  const [coverValue, setCoverValue] = useState("all");
  const [seasonValue, setSeasonValue] = useState("all");

  let filteredProductsByCategory = productList.filter((productItem) =>
    productItem.category.includes(product)
  );

  const isAlertVisible = product === Pages.KOVDRI && isAlertShow;

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoverValue(e.target.value);
  };

  const handleSeasonsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonValue(e.target.value);
  };

  const handleFiltersDefaultSet = () => {
    setCoverValue("all");
    setSeasonValue("all");
  };

  if (coverValue !== "all") {
    filteredProductsByCategory = filteredProductsByCategory.filter(
      (product) => product.cover === coverValue
    );
  }

  if (seasonValue !== "all") {
    filteredProductsByCategory = filteredProductsByCategory.filter(
      (product) => product.season === seasonValue
    );
  }

  const isShowAllFiltersButtonVisible =
    coverValue !== "all" ||
    (seasonValue !== "all" && filteredProductsByCategory.length > 0);

  console.log(filteredProductsByCategory.length);
  console.log(isShowAllFiltersButtonVisible);

  return (
    <section className="py-5">
      <div className="container">
        <Breadcrumbs radius="none" className="mb-3">
          <BreadcrumbItem href={Pages.MAIN}>
            <IoHomeOutline className="size-4" />
          </BreadcrumbItem>
          <BreadcrumbItem href={`/${Pages.CATALOG}`}>Каталог</BreadcrumbItem>
          <BreadcrumbItem>
            {BREADCRUMBS_LABEL[product as keyof typeof BREADCRUMBS_LABEL]}
          </BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-2xl text-grey mb-2">
          {
            SECTION_TITLE_TEXT_MAP[
              product as keyof typeof SECTION_TITLE_TEXT_MAP
            ]
          }
        </h2>
        {product === Pages.KOVDRI && (
          <>
            <Select
              className="mb-2 md:max-w-sm"
              label="Сезонність"
              placeholder="Виберіть сезонність використання"
              selectedKeys={[seasonValue]}
              labelPlacement="outside-left"
              variant="bordered"
              radius="none"
              size="sm"
              onChange={handleSeasonsChange}
            >
              {seasons.map((season) => (
                <SelectItem key={season.key}>{season.label}</SelectItem>
              ))}
            </Select>
            <Select
              className="mb-4 md:max-w-sm"
              label="Матеріал чохла"
              labelPlacement="outside-left"
              placeholder="Виберіть покриття"
              selectedKeys={[coverValue]}
              variant="bordered"
              radius="none"
              size="sm"
              onChange={handleSelectionChange}
            >
              {covers.map((cover) => (
                <SelectItem key={cover.key}>{cover.label}</SelectItem>
              ))}
            </Select>
          </>
        )}
        {isAlertVisible && <BlanketAlert />}

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProductsByCategory.map((filteredProduct) => (
            <ProductCard key={filteredProduct.id} product={filteredProduct} />
          ))}
        </div>
        {filteredProductsByCategory.length === 0 && (
          <div className="text-sm flex flex-col gap-4 justify-center items-center w-full min-h-[300px]">
            Упс, по цьому фільтру нічого не знайдено.
          </div>
        )}
        {isShowAllFiltersButtonVisible && (
          <div className="text-center mt-4">
            <Button
              size="md"
              radius="none"
              className="font-semibold text-accent"
              variant="light"
              onPress={handleFiltersDefaultSet}
            >
              ПОКАЗАТИ ВСІ КОВДРИ
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
