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
      // Очищаем предыдущую дату
      window.dataLayer.push({ ecommerce: null });

      // Отправляем событие
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "UAH",
          value: product.price, // Убедись, что в product.json цена называется так
          items: [
            {
              item_id: product.id,
              item_name: product.title, // Убедись, что поле называется name (или title)
              price: product.price,
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  return null; // Компонент ничего не рендерит в DOM
}
