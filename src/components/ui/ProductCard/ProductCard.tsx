"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export const animals = [
  { key: "1", label: "40x40" },
  { key: "2", label: "40x60" },
  { key: "3", label: "40x60" },
  { key: "4", label: "50x50" },
  { key: "5", label: "70x70" },
];

const ProductCard: React.FC = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Card
        className="border-none rounded-none border bg-background/60 dark:bg-default-100/50 max-w-[610px] p-1 relative mt-5"
        classNames={{
          base: "border-r-0",
        }}
      >
        <CardBody className="p-1">
          <div className="flex items-center justify-center mb-1">
            <Image
              alt="Album cover"
              as={NextImage}
              className="text-center"
              width={150}
              height={150}
              src="/images/podushka/podushka-satin.png"
            />
          </div>
          <p className="text-black text-center font-bold text-sm leading-4">
            Гіпоаллергенна подушка
          </p>
          <p className="text-black text-center font-bold text-xs leading-5 mb-2">
            (сатинове покриття)
          </p>
          <div className="flex flex-col justify-between items-baseline mb-2">
            <Select
              className="max-w-[200px] mb-2"
              label="Виберіть розмір"
              placeholder="Select an animal"
              size="sm"
              defaultSelectedKeys={["1"]}
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex justify-center items-center gap-2 mb-2">
              <p className="text-lg text-black font-bold">545 грн.</p>
              <p className="text-sm  text-lightGrey line-through font-semibold">
                595 грн.
              </p>
            </div>
          </div>

          <Button
            size="md"
            radius="none"
            variant="bordered"
            className="font-semibold text-accent border-accent text-md"
          >
            <FiShoppingCart className="size-5" />
            Замовити
          </Button>
        </CardBody>
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-3 right-3 z-10"
          radius="none"
          variant="light"
          onPress={() => setLiked((liked) => !liked)}
        >
          {liked ? (
            <FaHeart className="size-6 text-red-500" />
          ) : (
            <FaRegHeart className="size-6" />
          )}
        </Button>
        <div className="bg-accent p-2 inline-block absolute top-0 left-0 text-white text-xs z-10">
          Хіт продаж
        </div>
      </Card>
      <Card
        className="border-none rounded-none border bg-background/60 dark:bg-default-100/50 max-w-[610px] p-1 relative mt-5"
        classNames={{
          base: "border-r-0",
        }}
      >
        <CardBody className="p-1">
          <div className="flex items-center justify-center mb-1">
            <Image
              alt="Album cover"
              as={NextImage}
              className="text-center"
              width={150}
              height={150}
              src="/images/podushka/podushka-satin.png"
            />
          </div>
          <p className="text-black text-center font-bold text-sm leading-4">
            Гіпоаллергенна подушка
          </p>
          <p className="text-black text-center font-bold text-xs leading-5 mb-2">
            (сатинове покриття)
          </p>
          <div className="flex flex-col justify-between items-baseline mb-2">
            <Select
              className="max-w-[200px] mb-2"
              label="Виберіть розмір"
              placeholder="Select an animal"
              size="sm"
              defaultSelectedKeys={["1"]}
              variant="bordered"
              radius="none"
              labelPlacement="outside"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            <div className="flex justify-center items-center gap-2 mb-2">
              <p className="text-lg text-black font-bold">545 грн.</p>
              <p className="text-sm  text-lightGrey line-through font-semibold">
                595 грн.
              </p>
            </div>
          </div>

          <Button
            size="md"
            radius="none"
            variant="bordered"
            className="font-semibold text-accent border-accent text-md"
          >
            <FiShoppingCart className="size-5" />
            Замовити
          </Button>
        </CardBody>
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-3 right-3 z-10"
          radius="none"
          variant="light"
          onPress={() => setLiked((liked) => !liked)}
        >
          {liked ? (
            <FaHeart className="size-6 text-red-500" />
          ) : (
            <FaRegHeart className="size-6" />
          )}
        </Button>
        <div className="bg-accent p-2 inline-block absolute top-0 left-0 text-white text-xs z-10">
          Хіт продаж
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
