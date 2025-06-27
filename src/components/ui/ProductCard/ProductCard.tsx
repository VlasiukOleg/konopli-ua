"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Card, CardBody, Image, Button } from "@heroui/react";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard: React.FC = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] p-4 relative"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-center justify-center mb-4">
            <Image
              alt="Album cover"
              as={NextImage}
              className="text-center"
              width={250}
              height={250}
              src="/images/categories/aloevera-gel.png"
            />
          </div>
          <h3 className="text-xs text-lightGrey mb-2">Питні гелі Алое Вера</h3>
          <p className="text-grey font-semibold text-medium leading-5 mb-4">
            LR Питний гель Aloe Vera Peach без цукру, лр персик
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-lg text-accent font-bold">1 035 грн.</p>
              <p className="text-sm  text-lightGrey line-through font-semibold">
                1 400 грн.
              </p>
            </div>

            <Button
              size="sm"
              radius="sm"
              className="bg-accent font-semibold text-white"
            >
              <FiShoppingCart className="size-4" />
              Замовити
            </Button>
          </div>
        </CardBody>
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-3 right-3"
          radius="full"
          variant="light"
          onPress={() => setLiked((liked) => !liked)}
        >
          {liked ? (
            <FaHeart className="size-6 text-red-500" />
          ) : (
            <FaRegHeart className="size-6" />
          )}
        </Button>
        <div className="bg-accent p-2 inline-block absolute top-0 left-0 text-white text-xs rounded-br-large">
          Хіт продаж
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
