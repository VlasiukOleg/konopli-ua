"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

import { Pages } from "@/@types";

const Delivery: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.ABOUT}`}>
            Доставка і оплата
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Доставка і оплата</h1>
        <h2 className="text-accent font-semibold mb-2 xl:text-xl">
          Способи Доставки
        </h2>
        <ul className="text-sm md:text-sm xl:text-lg mb-2">
          <li>1. Укр Пошта</li>
          <li>2. Нова Пошта</li>
        </ul>
        <p className="text-sm md:text-sm xl:text-lg mb-3">
          Доставка здійснюється за рахунок покупця. Замовлення вирушають у
          будні. В середньому час відвантаження становить від 1 до 4 днів.
        </p>
        <h2 className="text-accent font-semibold mb-2 xl:text-xl">Оплата</h2>
        <p className="text-sm md:text-sm xl:text-lg mb-3">
          На сайті KonopliUa доступні такі способи оплати:
        </p>
        <ul className="text-sm md:text-sm xl:text-lg mb-2">
          <li>1. Наложений платіж</li>
          <li>2. Платіж на ФОП за реквізитами</li>
        </ul>
      </div>
    </section>
  );
};

export default Delivery;
