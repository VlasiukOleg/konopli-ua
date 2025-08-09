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
    <section className="py-5">
      <div className="container">
        {pathName !== Pages.MAIN && (
          <Breadcrumbs variant="bordered" radius="none">
            <BreadcrumbItem href="/">
              <IoHomeOutline />
            </BreadcrumbItem>
            <BreadcrumbItem href="/catalog">Каталог</BreadcrumbItem>
          </Breadcrumbs>
        )}

        <h1 className="text-2xl text-grey mb-2">{categoriesData.title}</h1>
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
