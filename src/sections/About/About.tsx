"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Pages } from "@/@types";

const About: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs className="mb-4">
          <BreadcrumbItem href="/">Головна</BreadcrumbItem>
          <BreadcrumbItem href={`${Pages.ABOUT}`}>Про нас</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="section-title mb-2">Про нас</h1>
        <p className="text-sm md:text-sm xl:text-lg mb-3">
          <span className="text-accent font-bold">KONOPLI-UA</span> — це
          український бренд, який створює екологічно чисту, натуральну та
          безпечну продукцію з коноплі.
        </p>
        <p className="text-sm md:text-sm xl:text-lg mb-3">
          Ми віримо, що здоров’я людини та здоров’я планети — нерозривно
          пов’язані. Тому наша місія — показати, що конопля — це не просто
          рослина, а цінне джерело комфорту, користі та гармонії з природою. У
          нашому асортименті — подушки, ковдри, одяг, косметика, наповнювачі,
          вироби для дому та багато іншого.
        </p>
        <p className="text-sm md:text-sm xl:text-lg mb-3">
          Усе виготовлено з натуральних конопляних волокон, без шкідливих
          добавок і синтетики. Ми підтримуємо українських виробників і працюємо
          лише з перевіреною сировиною. Кожен наш виріб — це результат турботи,
          досвіду та любові до природи. 🌿
        </p>
        <div className="text-sm md:text-sm xl:text-lg mb-3">
          Наші принципи:
          <ul className="pl-2 my-2">
            <li>1. 100% натуральність і екологічність;</li>
            <li>2. Виробництво в Україні;</li>
            <li>3. Турбота про людину і природу;</li>
            <li>4. Якість, що відчувається з першого дотику;</li>
          </ul>
        </div>
        <p className="text-sm md:text-sm xl:text-lg">
          <span className="text-accent font-bold">KONOPLI-UA</span> — живи на
          повну, у гармонії з природою!
        </p>
      </div>
    </section>
  );
};

export default About;
