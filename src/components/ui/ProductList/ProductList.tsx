"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button, Select, SelectItem } from "@heroui/react";

import ProductCard from "@/components/ui/ProductCard/ProductCard";
import BlanketAlert from "@/components/common/BlanketAlert";

import { generateProductTitle } from "@/utils/generateProductTitle";

import { useAlert } from "@/store/alert";

import { IoHomeOutline } from "react-icons/io5";
import productList from "@/data/productList.json";
import styles from "@/components/ui/ProductDescription/productDescription.module.css";

import { sizes, seasons, covers } from "@/constants/filters";

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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const seasonSearchParams = searchParams.get("season");
  const coverSearchParams = searchParams.get("cover");
  const sizeSearchParams = searchParams.get("size");

  const [coverValue, setCoverValue] = useState(coverSearchParams || "all");
  const [seasonValue, setSeasonValue] = useState(seasonSearchParams || "all");
  const [sizeValue, setSizeValue] = useState(sizeSearchParams || "1");

  const baseTitle =
    SECTION_TITLE_TEXT_MAP[product as keyof typeof SECTION_TITLE_TEXT_MAP];

  const dynamicTitle =
    product === Pages.KOVDRI
      ? generateProductTitle(
          baseTitle,
          seasonValue,
          coverValue,
          sizeValue,
          seasons,
          covers,
          sizes
        )
      : baseTitle;

  let filteredProductsByCategory = productList.filter((productItem) =>
    productItem.category.includes(product)
  );

  const filteredProductsByKomplektCategory = productList.filter((productItem) =>
    productItem.category.includes("komplekt-kovdra-podushka")
  );

  const isAlertVisible = product === Pages.KOVDRI && isAlertShow;

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCoverValue(e.target.value);
  };

  const handleSeasonsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeasonValue(e.target.value);
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSizeValue(e.target.value);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (seasonValue && seasonValue !== "all") {
      params.set("season", seasonValue);
    } else {
      params.delete("season");
    }

    if (coverValue && coverValue !== "all") {
      params.set("cover", coverValue);
    } else {
      params.delete("cover");
    }

    params.set("size", sizeValue);

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(newUrl, { scroll: false });
  }, [seasonValue, coverValue, sizeValue, pathname, router]);

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
        <h1 className="text-xl md:text-2xl text-grey mb-2">{dynamicTitle}</h1>
        {product === Pages.KOVDRI && (
          <>
            <Select
              className="mb-2 md:max-w-sm xl:mr-4"
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
            <Select
              className="mb-4 md:max-w-sm"
              label="Розмір ковдри"
              labelPlacement="outside-left"
              placeholder="Виберіть розмір"
              selectedKeys={[sizeValue]}
              variant="bordered"
              radius="none"
              size="sm"
              onChange={handleSizesChange}
              listboxProps={{
                classNames: {
                  base: styles.listbox,
                },
                itemClasses: {
                  title: "whitespace-normal text-xs",
                },
              }}
            >
              {sizes.map((size) => (
                <SelectItem key={size.key}>{size.label}</SelectItem>
              ))}
            </Select>
          </>
        )}
        {isAlertVisible && <BlanketAlert />}

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProductsByCategory.map((filteredProduct) => (
            <ProductCard
              key={filteredProduct.id}
              product={filteredProduct}
              sizeValue={sizeValue}
            />
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
        {product === Pages.KOVDRI && (
          <>
            <h2 className="md:text-xl my-4 font-bold">
              Також Вас може зацікавити
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredProductsByKomplektCategory.map((filteredProduct) => (
                <ProductCard
                  key={filteredProduct.id}
                  product={filteredProduct}
                  sizeValue={sizeValue}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductList;
