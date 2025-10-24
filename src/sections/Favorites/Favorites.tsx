"use client";

import { Breadcrumbs, BreadcrumbItem, Button, Link } from "@heroui/react";
import ProductCard from "@/components/ui/ProductCard";

import { useFavorite } from "@/store/favorite";

import { Pages } from "@/@types";

import productList from "@/data/productList.json";
import { FaArrowRight } from "react-icons/fa";

const Favorites: React.FC = () => {
  const { favoriteIds } = useFavorite();

  const filteredProductListByFavoriteIds = productList.filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <section className="section min-h-[390px]">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.FAVORITES}`}>
            Список бажань
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Список бажань</h1>

        {filteredProductListByFavoriteIds.length > 0 ? (
          filteredProductListByFavoriteIds.map((filteredProduct) => (
            <div
              key={filteredProduct.id}
              className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4"
            >
              <ProductCard product={filteredProduct} />{" "}
            </div>
          ))
        ) : (
          <div className="text-sm flex flex-col gap-4 justify-center items-center w-full min-h-[300px]">
            Упс, Ви поки нічого не додали в список бажань.
            <Button
              as={Link}
              size="md"
              href={Pages.CATALOG}
              radius="none"
              className="bg-accent font-semibold text-white "
            >
              В КАТАЛОГ
              <FaArrowRight />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
