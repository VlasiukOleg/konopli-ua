"use client";

import { Link } from "@heroui/react";

import CategoryCard from "@/components/ui/CategoryCard/";

import categoriesData from "@/data/categoryList.json";

import { Pages } from "@/@types";

const Hero: React.FC = ({}) => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl text-grey ">{categoriesData.popularTitle}</h1>
          <Link
            size="sm"
            href={Pages.CATALOG}
            className="text-accent"
            underline="always"
          >
            Всі категорії
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {categoriesData.list.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
