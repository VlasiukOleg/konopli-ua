import { NextResponse } from "next/server";
import products from "@/data/productList.json";

const siteUrl = "https://www.konopli-ua.com";

const googleCategories: Record<string, number> = {
  "gipoallergenni-podushki": 2700,
  "postil-konoplyana": 4171,
  "dityacha-postil": 1985,
  "kovdri-i-pledi": 1985,
  "shkarpetki-i-ustilki": 213,
  "dlya-vannoi": 574,
  "kosmetika": 473,
  "spidnya-bilyzna": 2562,
};

export async function GET() {
  const itemsXml = products
    .map((product) => {
      // ID товару
      const pid = product.id || "";

      // Заголовок
      const title = product.subTitle
        ? `${product.title} ${product.subTitle}`
        : product.title || "";

      // Опис
      const descArr = product.description || [];
      const desc =
        descArr.find((d) => d && d.trim())?.trim() ||
        descArr.join(" ").substring(0, 1000) ||
        "";

      // Категорія та посилання
      const cat0 =
        product.category && product.category.length
          ? product.category[0]
          : "catalog";
      const link = `${siteUrl}/catalog/${cat0}/${pid}`;

      // Зображення
      const images =
        product.images && product.images.length
          ? product.images
          : product.image
          ? [product.image]
          : [];
      const image = images[0] || "";
      const image_link = image.startsWith("/") ? `${siteUrl}${image}` : image;

      // Наявність
      const availability = product.availability || "in_stock";

      // Ціна
      let price = "";
      if (product.sizes && product.sizes.length) {
        const defaultKey = product.defaultSize;
        const sz =
          product.sizes.find((s) => s.key === defaultKey) || product.sizes[0];
        if (sz?.price) price = `${sz.price} UAH`;
      }

      if (!price && product.price) price = `${product.price} UAH`;

      // Категорія Google
      const gcat = googleCategories[cat0];


      return `
        <item>
          <g:id>${pid}</g:id>
          <g:title><![CDATA[${title}]]></g:title>
          <g:description><![CDATA[${desc}]]></g:description>
          <g:link>${link}</g:link>
          <g:image_link>${image_link}</g:image_link>
          <g:availability>${availability}</g:availability>
          <g:price>${price}</g:price>
          <g:condition>new</g:condition>
          <g:google_product_category><![CDATA[${gcat}]]></g:google_product_category>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Konopli UA Catalog</title>
    <link>${siteUrl}</link>
    <description>Каталог товарів konopli-ua.com</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
