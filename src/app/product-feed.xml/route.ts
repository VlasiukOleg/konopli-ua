import { NextResponse } from "next/server";
import products from "@/data/productList.json";
const siteUrl = "https://www.konopli-ua.com";

export async function GET() {
  const itemsXml = products
    .map((product) => {
      const pid = product.id || "";
      const title = `${product.title} ${product.subTitle} || ""`;
      const descArr = product.description || [];
      let desc = "";
      for (const d of descArr) {
        if (d && d.trim()) {
          desc = d.trim();
          break;
        }
      }
      if (!desc) desc = (descArr.join(" ") || "").substring(0, 1000);

      const cat0 =
        product.category && product.category.length
          ? product.category[0]
          : "catalog";
      const link = `${siteUrl}/catalog/${cat0}/${pid}`;

      const images =
        product.images && product.images.length
          ? product.images
          : product.image
          ? [product.image]
          : [];
      const image = images[0] || "";
      const image_link = image.startsWith("/") ? `${siteUrl}${image}` : image;

      const availability = product.availability;

      let price = "";
      const defaultKey = product.defaultSize;
      if (product.sizes && product.sizes.length) {
        const sz =
          product.sizes.find((s) => s.key === defaultKey) || product.sizes[0];
        price = sz && sz.price ? `${sz.price} UAH` : "";
      }

      let gcat = "Home & Garden > Linens & Bedding";
      const t = title.toLowerCase();
      if (t.includes("подуш") || t.includes("подушка"))
        gcat = "Home & Garden > Linens & Bedding > Bedding > Bed Pillows";
      if (t.includes("ковдр") || t.includes("ковд") || t.includes("плед"))
        gcat =
          "Home & Garden > Linens & Bedding > Bedding > Comforters & Duvets";

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
