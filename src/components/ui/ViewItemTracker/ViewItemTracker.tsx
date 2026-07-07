"use client";

import { useEffect } from "react";

import { IProductCard } from "@/@types";

export default function ViewItemTracker({
  product,
}: {
  product: IProductCard;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      // Ищем данные размера, который выбран по умолчанию
      const defaultSizeData = product.sizes.find(
        (size) => size.key === product.defaultSize,
      );

      // Определяем финальную цену: берем salePrice, если нет - берем price.
      // Если по какой-то причине размера нет, ставим 0.
      let finalPrice = 0;
      if (defaultSizeData) {
        const activePrice = defaultSizeData.salePrice
          ? defaultSizeData.salePrice
          : defaultSizeData.price;

        finalPrice = Number(activePrice) || 0; // Переводим строку ("800") в число (800)
      }

      // Очищаем предыдущую дату
      window.dataLayer.push({ ecommerce: null });

      // Отправляем событие
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "UAH",
          value: finalPrice, // Теперь тут будет актуальная цена
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              price: finalPrice, // И тут тоже
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  return null; // Компонент ничего не рендерит в DOM
}
