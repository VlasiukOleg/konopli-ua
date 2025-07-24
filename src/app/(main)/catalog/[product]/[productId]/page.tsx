import { notFound } from "next/navigation";

import ProductDescription from "@/components/ui/ProductDescription";
import productList from "@/data/productList.json";
import { Pages } from "@/@types";

interface PageProps {
  params: Promise<{ product: Pages; productId: string }>;
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export async function generateStaticParams() {
  return productList.flatMap((item) =>
    item.category.map((cat) => ({
      product: cat,
      productId: item.id,
    }))
  );
}

const ProductPage: React.FC<PageProps> = async ({ params }) => {
  const { product, productId } = await params;

  const item = productList.find(
    (p) => p.id === productId && p.category.includes(product)
  );

  if (!item) return notFound();

  return <ProductDescription product={item} />;
};

export default ProductPage;
