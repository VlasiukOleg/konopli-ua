import { Suspense } from "react";

import ProductList from "@/components/ui/ProductList/ProductList";
import Loader from "@/components/common/Loader/Loader";

import data from "@/data/common.json";
import { Pages } from "@/@types";

interface PageProps {
  params: Promise<{ product: Pages }>;
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export function generateStaticParams() {
  return data.productSlugs.map((product) => {
    return { product };
  });
}

const Product: React.FC<PageProps> = async ({ params }) => {
  const { product } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <ProductList product={product} />
    </Suspense>
  );
};

export default Product;
