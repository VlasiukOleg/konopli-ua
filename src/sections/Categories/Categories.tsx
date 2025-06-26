"use client";

import categoriesData from "@/data/categoryList.json";

import CategoryCard from "@/components/ui/CategoryCard/";

const Hero: React.FC = ({}) => {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="text-2xl text-grey mb-2">{categoriesData.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {categoriesData.list.map((category) => {
            return (
              <div key={category.id}>
                <CategoryCard category={category} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
