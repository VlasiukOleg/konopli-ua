"use client";

import { Link } from "@heroui/react";

const Hero: React.FC = ({}) => {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="text-2xl text-grey">Категорії</h1>
        <div className="flex flex-col">
          <Link href="#">Алое вера питні гелі</Link>
          <Link href="#">Основа для гарного самопочуття</Link>
          <Link href="#">Коктейлі. Протеїн</Link>
          <Link href="#">Супи</Link>
          <Link href="#">Жіноче здоров'я</Link>
          <Link href="#">Імунітет. Захист організму</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
