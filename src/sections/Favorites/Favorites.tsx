"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import ProductCard from "@/components/ui/ProductCard";

import { useFavorite } from "@/store/favorite";

import { Pages } from "@/@types";

import productList from "@/data/productList.json";

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
          <BreadcrumbItem href={`${Pages.FAVORITES}`}>Список бажань</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Список бажань</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProductListByFavoriteIds.map((filteredProduct) => (
            <ProductCard key={filteredProduct.id} product={filteredProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
