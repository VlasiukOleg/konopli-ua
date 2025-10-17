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
import { useFavorite } from "@/store/favorite";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegSnowflake } from "react-icons/fa";

import { IProductCard } from "@/@types";

import styles from "@/components/ui/ProductDescription/productDescription.module.css";

interface IProductCardProps {
  product: IProductCard;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, favoriteIds } = useFavorite();

  const isProductAddToFavorite = favoriteIds.includes(product.id);

  const [selectedSize, setSelectedSize] = useState(product.defaultSize);

  const currentSize =
    product.sizes.find((size) => size.key === selectedSize) || product.sizes[0];

  const handleOpen = () => {
    onOpen();

    addItem({
      id: product.id,
      title: product.title,
      subTitle: product.subTitle,
      price: Number(currentSize?.price) || Number(product.price),
      salePrice: Number(currentSize?.salePrice) || Number(product.salePrice),
      image: product.image,
      size: currentSize?.label || "",
    });
  };

  const handleProductAddToFavorite = () => {
    if (!isProductAddToFavorite) {
      addFavorite(product.id);
      return;
    }

    removeFavorite(product.id);
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
          className="border-none rounded-none border bg-background/60 dark:bg-default-100/50 max-w-[610px] p-1 relative"
          classNames={{
            base: "border-r-0",
          }}
        >
          <CardBody className="p-1 rounded-none">
            <div className="flex items-center justify-center mb-1">
              <Image
                alt="Album cover"
                as={NextImage}
                className="text-center rounded-none"
                width={150}
                height={150}
                src={product.image}
              />
            </div>
            <div className="mb-2">
              <p className="text-black flex items-center justify-center text-center font-bold text-sm leading-4 min-h-[64px]">
                {product.title}
              </p>
              {product.subTitle && (
                <p className="text-black text-center font-bold text-xs leading-5 ">
                  ({product.subTitle})
                </p>
              )}
            </div>

            <div className="flex flex-col justify-between items-baseline mb-2">
              {product.sizes.length > 0 && (
                <Select
                  className="max-w-full mb-2"
                  label="Виберіть розмір"
                  placeholder="Виберіть розмір"
                  size="sm"
                  selectedKeys={[selectedSize]}
                  onSelectionChange={(keys) =>
                    setSelectedSize(Array.from(keys)[0] as string)
                  }
                  variant="bordered"
                  radius="none"
                  labelPlacement="outside"
                  classNames={{
                    value: "text-xs",
                  }}
                  listboxProps={{
                    classNames: {
                      base: styles.listbox,
                    },
                    itemClasses: {
                      title: "whitespace-normal text-xs",
                    },
                  }}
                >
                  {product.sizes.map((size) => (
                    <SelectItem key={size.key}>{size.label}</SelectItem>
                  ))}
                </Select>
              )}

              <div className="flex justify-center items-center gap-2 mb-2">
                <p className="text-base text-black font-bold">
                  {currentSize?.price || product.price} грн.
                </p>
                {(currentSize?.salePrice && (
                  <p className="text-sm text-lightGrey line-through font-semibold">
                    {currentSize.salePrice} грн.
                  </p>
                )) ||
                  (product.salePrice && (
                    <p className="text-sm text-lightGrey line-through font-semibold">
                      {product.salePrice} грн.
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <Button
                size="md"
                radius="none"
                variant="solid"
                className="font-semibold flex-1 text-white bg-accent text-md"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                onPress={handleOpen}
              >
                <FiShoppingCart className="size-5" />
                Замовити
              </Button>
              <Button
                isIconOnly
                className="text-default-900/60 border-accent"
                radius="none"
                variant="bordered"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                onPress={handleProductAddToFavorite}
              >
                {isProductAddToFavorite ? (
                  <FaHeart className="size-6 text-red-500" />
                ) : (
                  <FaRegHeart className="size-6" />
                )}
              </Button>
            </div>
          </CardBody>
          {product.tags.includes("Хіт продаж") && (
            <div className="bg-accent p-2 inline-block absolute top-0 left-0 text-white text-xs z-10">
              Хіт продаж
            </div>
          )}
          {product.tags.includes("Зимова") && (
            <div className="bg-blue-800 rounded-full flex justify-center items-center p-1 absolute top-2 left-2 text-white z-10 size-7">
              <FaRegSnowflake className="size-4" />
            </div>
          )}
        </Card>
      </div>
      <CartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ProductCard;
