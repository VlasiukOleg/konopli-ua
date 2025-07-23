import ProductList from "@/components/ui/ProductList/ProductList";

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
  return <ProductList product={product} />;
};

export default Product;
