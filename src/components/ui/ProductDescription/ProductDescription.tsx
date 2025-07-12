"use client";

import { useState } from "react";
import { Card, CardBody, Button, NumberInput } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Select, SelectItem } from "@heroui/react";
import ImageGallery from "react-image-gallery";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import "react-image-gallery/styles/css/image-gallery.css";

const description =
  "Подушка складається з 80% натурального конопляного наповнювача та має сатинове покриття, що додає м'якості та комфорту. Спеціальна структура волокон коноплі дозволяє повітрю проникати всередину подушки, що допомагає забезпечити оптимальний рівень вологості та температури під час сну. Крім того, конопля є природним антибактеріальним засобом, який захищає від пилових кліщів, бактерій та грибків, що робить цю подушку ідеальним вибором для людей з алергіями та астмою.";

const advantages = (
  <ul>
    <li>
      <span>Дозволяє тілу &apos;дихати&apos;</span>
    </li>
    <li>Антибактеріальна</li>
    <li>Гіпоалергенна</li>
    <li>Поглинає вологу та запобігає пітливості</li>
    <li>Дуже міцна та довговічна</li>
    <li>Захищає від пилових кліщів, бактерій та грибків</li>
    <li>Підходить для людей з алергіями та астмою</li>
    <li>Виготовлена з екологічно чистих натуральних матеріалів</li>
  </ul>
);

const care =
  "Подушки, виготовлені з натуральної конопляної тканини, відрізняються екологічністю, повітропроникністю та гіпоалергенністю. Щоб вони служили вам довго та зберегли свої природні властивості, дотримуйтесь наведених нижче рекомендацій.❗ ВАЖЛИВО: ПРАТИ НАПОВНЮВАЧ КАТЕГОРИЧНО ЗАБОРОНЕНО!Наповнювач подушки не підлягає пранню! Він не витримує дії води та пральних засобів.Волога або машинне прання можуть призвести до деформації, появи запаху та втрати властивостей натурального волокна.Заборонено занурювати подушку у воду повністю.Єдиний допустимий спосіб догляду за наповнювачем — регулярне провітрювання на свіжому повітрі, бажано раз на 2–4 тижні (в тіні, подалі від прямих сонячних променів).";

const images = [
  {
    original: "/images/podushka/podushka-satin.png",
    thumbnail: "/images/podushka/podushka-satin.png",
  },
  {
    original: "/images/podushka/podushka-satin-1.png",
    thumbnail: "/images/podushka/podushka-satin-1.png",
  },
  {
    original: "/images/podushka/podushka-satin-2.png",
    thumbnail: "/images/podushka/podushka-satin-2.png",
  },
];

export const sizes = [
  { key: "1", label: "40x40" },
  { key: "2", label: "40x60" },
  { key: "3", label: "40x60" },
  { key: "4", label: "50x50" },
  { key: "5", label: "70x70" },
];

const ProductDescription: React.FC = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Card className="border-none rounded-none  bg-background/60 dark:bg-default-100/50 max-w-[610px] p-1 mb-5">
        <CardBody className="p-1">
          <div className="flex items-center justify-center mb-4">
            <ImageGallery items={images} />
          </div>
        </CardBody>
      </Card>
      <p className="text-grey font-semibold text-xl leading-7 mb-2">
        Гіпоаллергенна подушка (сатинове покриття)
      </p>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <p className=" text-accent font-bold text-2xl">545 грн.</p>
        <p className="text-lg  text-lightGrey line-through font-semibold">
          595 грн.
        </p>
      </div>
      <div className="flex mb-4">
        <Select
          className="max-w-full"
          label="Виберіть розмір"
          placeholder="Select an animal"
          size="sm"
          defaultSelectedKeys={["1"]}
          variant="bordered"
          radius="none"
          labelPlacement="outside"
        >
          {sizes.map((size) => (
            <SelectItem key={size.key}>{size.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center justify-between  gap-2">
        <NumberInput
          className="max-w-[120px] max-h-[40px] border-accent"
          radius="none"
          defaultValue={1}
          label="Кількість"
        />
        <Button
          size="md"
          radius="none"
          variant="bordered"
          className="font-semibold text-accent border-accent"
        >
          <FiShoppingCart className="size-6" />
          Замовити
        </Button>
        <Button
          isIconOnly
          className="text-default-900/60 border-accent"
          radius="none"
          variant="bordered"
          onPress={() => setLiked((liked) => !liked)}
        >
          {liked ? (
            <FaHeart className="size-6 text-red-500" />
          ) : (
            <FaRegHeart className="size-6" />
          )}
        </Button>
      </div>
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Опис">
          {description}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Переваги">
          {advantages}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Догляд">
          {care}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProductDescription;
