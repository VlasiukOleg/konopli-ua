"use client";

import ProductCard from "@/components/ui/ProductCard/ProductCard";

import productList from "@/data/productList.json";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

import { IoHomeOutline } from "react-icons/io5";

import { Pages, BREADCRUMBS_LABEL } from "@/@types/index";

interface IProductListProps {
  product: string;
}

const ProductList: React.FC<IProductListProps> = ({ product }) => {
  const filteredProductsByCategory = productList.filter((productItem) =>
    productItem.category.includes(product)
  );

  return (
    <section className="py-5">
      <div className="container">
        <Breadcrumbs variant="bordered" radius="none" className="mb-3">
          <BreadcrumbItem href={Pages.MAIN}>
            <IoHomeOutline />
          </BreadcrumbItem>
          <BreadcrumbItem href={`/${Pages.CATALOG}`}>Каталог</BreadcrumbItem>
          <BreadcrumbItem href="/catalog">
            {BREADCRUMBS_LABEL[product as keyof typeof BREADCRUMBS_LABEL]}
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProductsByCategory.map((filteredProduct) => (
            <ProductCard key={filteredProduct.id} product={filteredProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
