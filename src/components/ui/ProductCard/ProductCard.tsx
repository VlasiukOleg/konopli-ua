"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import CartDrawer from "@/components/ui/CartDrawer";
import {
  Card,
  CardBody,
  Image,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";

import { useCart } from "@/store/cart";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { IProductCard } from "@/@types";

interface IProductCardProps {
  product: IProductCard;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addItem } = useCart();

  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);

  const currentSize =
    product.sizes.find((size) => size.key === selectedSize) || product.sizes[0];

  const handleOpen = () => {
    onOpen();

    addItem({
      id: product.id,
      title: product.title,
      price: Number(currentSize.price),
      image: product.image,
      size: currentSize.label,
    });
  };

  return (
    <>
      <div
        onClick={() =>
          router.push(`/catalog/${product.category[0]}/${product.id}`)
        }
        className="cursor-pointer"
      >
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
                src={product.image}
              />
            </div>
            <p className="text-black text-center font-bold text-sm leading-4">
              {product.title}
            </p>
            <p className="text-black text-center font-bold text-xs leading-5 mb-2">
              ({product.subTitle})
            </p>
            <div className="flex flex-col justify-between items-baseline mb-2">
              <Select
                className="max-w-[200px] mb-2"
                label="Виберіть розмір"
                placeholder="Select an animal"
                size="sm"
                selectedKeys={[selectedSize]}
                onSelectionChange={(keys) =>
                  setSelectedSize(Array.from(keys)[0] as string)
                }
                variant="bordered"
                radius="none"
                labelPlacement="outside"
              >
                {product.sizes.map((size) => (
                  <SelectItem key={size.key}>{size.label}</SelectItem>
                ))}
              </Select>
              <div className="flex justify-center items-center gap-2 mb-2">
                <p className="text-lg text-black font-bold">
                  {currentSize.price} грн.
                </p>
                <p className="text-sm text-lightGrey line-through font-semibold">
                  {currentSize.salePrice} грн.
                </p>
              </div>
            </div>

            <Button
              size="md"
              radius="none"
              variant="bordered"
              className="font-semibold text-accent border-accent text-md"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
              }}
              onPress={handleOpen}
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
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setLiked((liked) => !liked);
            }}
          >
            {liked ? (
              <FaHeart className="size-6 text-red-500" />
            ) : (
              <FaRegHeart className="size-6" />
            )}
          </Button>
          {product.tags.includes("Хіт продаж") && (
            <div className="bg-accent p-2 inline-block absolute top-0 left-0 text-white text-xs z-10">
              Хіт продаж
            </div>
          )}
        </Card>
      </div>
      <CartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ProductCard;
