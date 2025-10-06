"use client";

import { Link } from "@heroui/react";

import CategoryCard from "@/components/ui/CategoryCard/";

import categoriesData from "@/data/categoryList.json";

import { Pages } from "@/@types";

const Hero: React.FC = ({}) => {
  const popularMBCategoryList = categoriesData.list.filter(
    (category) => category.id <= 2
  );

  const popularMDCategoryList = categoriesData.list.filter(
    (category) => category.id <= 3
  );

  const popularXLCategoryList = categoriesData.list.filter(
    (category) => category.id <= 5
  );
  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h1 className="section-title">{categoriesData.popularTitle}</h1>
          <Link
            href={Pages.CATALOG}
            className="text-accent text-sm md:text-base xl:text-lg"
            underline="always"
          >
            Всі категорії
          </Link>
        </div>

        <div className="grid grid-cols-2 md:hidden gap-4">
          {popularMBCategoryList.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
        <div className="hidden md:grid md:grid-cols-3 md:gap-6 xl:hidden">
          {popularMDCategoryList.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
        <div className="hidden xl:grid xl:grid-cols-5 xl:gap-6">
          {popularXLCategoryList.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
