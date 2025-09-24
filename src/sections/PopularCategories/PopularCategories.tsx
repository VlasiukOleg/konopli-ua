"use client";

import { Link } from "@heroui/react";

import CategoryCard from "@/components/ui/CategoryCard/";

import categoriesData from "@/data/categoryList.json";

import { Pages } from "@/@types";

const Hero: React.FC = ({}) => {
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

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {categoriesData.list.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
