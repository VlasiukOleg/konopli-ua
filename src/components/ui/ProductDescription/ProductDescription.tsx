"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Input,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Accordion, AccordionItem } from "@heroui/accordion";
import ImageGallery from "react-image-gallery";

import CartDrawer from "@/components/ui/CartDrawer";

import { useCart } from "@/store/cart";
import { useFavorite } from "@/store/favorite";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { PiLineVerticalBold } from "react-icons/pi";

import { IProductCard, Pages, BREADCRUMBS_LABEL } from "@/@types";

import "react-image-gallery/styles/css/image-gallery.css";
import styles from "@/components/ui/ProductDescription/productDescription.module.css";

interface ProductDescriptionProps {
  product: IProductCard;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addItem, updateQuantity } = useCart();
  const { addFavorite, removeFavorite, favoriteIds } = useFavorite();

  const pathName = usePathname();

  const partsPathName = pathName.split("/");

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);

  const isProductAddToFavorite = favoriteIds.includes(product.id);

  const currentSize =
    product.sizes.find((size) => size.key === selectedSize) || product.sizes[0];

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleCartDrawerOpen = () => {
    onOpen();

    addItem({
      id: product.id,
      title: product.title,
      subTitle: product.subTitle,
      price: Number(currentSize.price),
      salePrice: Number(currentSize.salePrice),
      image: product.image,
      size: currentSize.label,
    });

    updateQuantity(product.id, currentSize.label, quantity);
  };

  const handleProductAddToFavorite = () => {
    if (!isProductAddToFavorite) {
      addFavorite(product.id);
      addToast({
        title: "Додано до списку бажань",
        description: `${product.title} (${product.subTitle})`,
        timeout: 3000,
        color: "success",
        shouldShowTimeoutProgress: true,
        variant: "bordered",
      });
      return;
    }

    removeFavorite(product.id);
    addToast({
      title: "Видаленно зі списку бажань",
      description: `${product.title} (${product.subTitle})`,
      timeout: 3000,
      color: "danger",
      shouldShowTimeoutProgress: true,
      variant: "bordered",
    });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <Breadcrumbs
            radius="none"
            className="mb-3"
            itemClasses={{
              item: "whitespace-normal",
            }}
          >
            <BreadcrumbItem href={Pages.MAIN}>
              <IoHomeOutline className="size-4" />
            </BreadcrumbItem>
            <BreadcrumbItem href={`/${Pages.CATALOG}`}>Каталог</BreadcrumbItem>
            <BreadcrumbItem href={`/${Pages.CATALOG}/${partsPathName[2]}`}>
              {
                BREADCRUMBS_LABEL[
                  partsPathName[2] as keyof typeof BREADCRUMBS_LABEL
                ]
              }
            </BreadcrumbItem>
            <BreadcrumbItem>{product.title}</BreadcrumbItem>
          </Breadcrumbs>
          <div className="xl:flex xl:gap-10">
            <Card className="border-none rounded-none  bg-background/60 dark:bg-default-100/50 p-0 mb-5 xl:w-[50%]">
              <CardBody className="p-0">
                <div className="p-2">
                  {product?.images && (
                    <ImageGallery
                      items={product.images.map((img) => ({
                        original: img,
                        thumbnail: img,
                      }))}
                      showPlayButton={false}
                      showFullscreenButton={true}
                    />
                  )}
                </div>
              </CardBody>
              {product.tags.includes("discount35") && (
                <div className="bg-red-600 px-2 py-1 inline-block absolute top-2 left-2 text-white text-xs z-10">
                  -35%
                </div>
              )}
            </Card>
            <div className="xl:w-[50%]">
              <p className="text-black font-semibold text-xl leading-7 mb-2 md:text-2xl">
                {product.title}{" "}
                {product.subTitle && <span> ({product.subTitle})</span>}
              </p>
              {product.cover && (
                <p className="text-grey text-sm md:text-base">
                  Чохол: <span className="text-black">{product.cover}</span>
                </p>
              )}
              {product.filling && (
                <p className="text-grey text-sm mb-4 md:text-base">
                  Наповнювач:{" "}
                  <span className="text-black">{product.filling}</span>
                </p>
              )}

              <div className="flex mb-4">
                {product.sizes.length > 0 && (
                  <Select
                    className="max-w-full"
                    label="Виберіть розмір"
                    placeholder="Виберіть розмір"
                    size="md"
                    defaultSelectedKeys={["1"]}
                    variant="bordered"
                    radius="none"
                    labelPlacement="outside"
                    selectedKeys={[selectedSize]}
                    onSelectionChange={(keys) =>
                      setSelectedSize(Array.from(keys)[0] as string)
                    }
                    listboxProps={{
                      classNames: {
                        base: styles.listbox,
                      },
                      itemClasses: {
                        title: "whitespace-normal",
                      },
                    }}
                  >
                    {product.sizes.map((size) => (
                      <SelectItem key={size.key}>{size.label}</SelectItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <p className=" text-black  font-semibold text-xl">
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
              <div className="md:flex items-center justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Button
                      isIconOnly
                      aria-label="Take a photo"
                      className=" border-accent"
                      radius="none"
                      variant="bordered"
                      size="md"
                      onPress={handleDecrease}
                    >
                      <FaMinus className=" text-accent" />
                    </Button>
                    <Input
                      name="quantity"
                      variant="bordered"
                      type="number"
                      radius="none"
                      size="md"
                      classNames={{
                        inputWrapper:
                          "group-data-[focus=true]:border-accent w-20",
                        base: "w-20 mx-2",
                        input: "text-center",
                      }}
                      value={quantity.toString()}
                      onValueChange={(value) => setQuantity(Number(value) || 1)}
                    />
                    <Button
                      isIconOnly
                      aria-label="Take a photo"
                      className=" border-accent"
                      radius="none"
                      variant="bordered"
                      size="md"
                      onPress={handleIncrease}
                    >
                      <FaPlus className=" text-accent" />
                    </Button>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 border-accent"
                    radius="none"
                    variant="bordered"
                    onPress={handleProductAddToFavorite}
                  >
                    {isProductAddToFavorite ? (
                      <FaHeart className="size-6 text-red-500" />
                    ) : (
                      <FaRegHeart className="size-6" />
                    )}
                  </Button>
                </div>
                <div>
                  <Button
                    size="md"
                    radius="none"
                    variant="solid"
                    className="font-semibold w-full bg-accent text-white mb-4 md:w-[200px]"
                    onPress={handleCartDrawerOpen}
                  >
                    <FiShoppingCart className="size-6" />
                    Замовити
                  </Button>
                </div>
              </div>

              {currentSize?.package && (
                <>
                  <p className="text-sm font-semibold mb-2">Комплектація</p>
                  <ul className="space-y-2 text-sm">
                    {currentSize.package.map((packageItem, index) => (
                      <li key={index}>{packageItem}</li>
                    ))}
                  </ul>
                </>
              )}
              <Accordion className="text-sm md:text-base">
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Опис"
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <PiLineVerticalBold className="text-accent" />
                    ) : (
                      <FaPlus className="text-accent" />
                    )
                  }
                  classNames={{ title: "md:text-lg" }}
                >
                  {product?.description && (
                    <ul className="space-y-2">
                      {product.description.map((advantage, index) => (
                        <li key={index}>
                          {product?.descriptionTitle && (
                            <div className="font-semibold mb-2">
                              {product.descriptionTitle[index]}
                            </div>
                          )}
                          {product?.descriptionList && (
                            <ul className="list-disc pl-5 space-y-1 marker:text-accent">
                              {product.descriptionList[index]
                                ?.split("/")
                                .map((descriptionItem, index) => (
                                  <li key={index}>{descriptionItem}</li>
                                ))}
                            </ul>
                          )}
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title="Переваги"
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <PiLineVerticalBold className="text-accent" />
                    ) : (
                      <FaPlus className="text-accent" />
                    )
                  }
                  classNames={{ title: "md:text-lg" }}
                >
                  {product?.advantages && (
                    <ul className="list-disc pl-5 space-y-1 marker:text-accent">
                      {product.advantages.map((advantage, index) => (
                        <li key={index}>{advantage}</li>
                      ))}
                    </ul>
                  )}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title="Догляд"
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <PiLineVerticalBold className="text-accent" />
                    ) : (
                      <FaPlus className="text-accent" />
                    )
                  }
                  classNames={{ title: "md:text-lg" }}
                >
                  {Array.isArray(product.care)
                    ? product.care.map((careItem) => (
                        <>
                          <div key={careItem.title} className="mb-2">
                            <p className="font-bold mb-2">{careItem.title}</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-accent">
                              {careItem.descriptionList.map(
                                (descriptionItem: string, index: number) => (
                                  <li key={index}>{descriptionItem}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </>
                      ))
                    : product.care}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <CartDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
      </section>
    </>
  );
};

export default ProductDescription;
