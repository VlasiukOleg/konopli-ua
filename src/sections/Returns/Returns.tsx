"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

import { Pages } from "@/@types";

const Returns: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.DOSTAVKA_OPLATA}`}>
            Обмін та повернення
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Обмін та повернення</h1>
        <div className="text-sm md:text-sm xl:text-lg">
          <h2 className="font-semibold">Повернення товарів</h2>
          <div className="mb-2">
            {" "}
            Згідно з законом України «Про захист прав споживачів», ви маєте
            право повернути або обміняти товар, придбаний у магазині, протягом
            14 днів з моменту покупки, за умови дотримання всіх законодавчих
            вимог. Усі питання, пов&apos;язані з обміном та поверненням товарів,
            регулюються виключно українським законодавством про права
            споживачів.
          </div>
          <h2 className="font-semibold">Повернення коштів</h2>
          <div>
            При поверненні кошти будуть перераховані протягом 5 робочих днів
            після отримання повернутої посилки (без урахування дня отримання).
            Витрати на доставку повернутого товару несе клієнт, за винятком
            випадків, коли товар має брак або коли сталася помилка з боку
            інтернет-магазину.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Returns;
