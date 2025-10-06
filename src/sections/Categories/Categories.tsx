"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

import CategoryCard from "@/components/ui/CategoryCard/";

import categoriesData from "@/data/categoryList.json";
import { Pages } from "@/@types";

import { IoHomeOutline } from "react-icons/io5";

const Hero: React.FC = ({}) => {
  const pathName = usePathname();

  return (
    <section className="section">
      <div className="container">
        {pathName !== Pages.MAIN && (
          <Breadcrumbs radius="none" className="mb-3">
            <BreadcrumbItem href={Pages.MAIN}>
              <IoHomeOutline className="size-4" />
            </BreadcrumbItem>
            <BreadcrumbItem>Каталог</BreadcrumbItem>
          </Breadcrumbs>
        )}

        <h1 className="section-title mb-2 md:mb-4">{categoriesData.title}</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5 xl:gap-6">
          {categoriesData.list.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
