import ProductList from "@/components/ui/ProductList/ProductList";

import data from "@/data/common.json";

export interface PageProps {
  params: { product: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export function generateStaticParams() {
  return data.productSlugs.map((product) => {
    return { product };
  });
}

async function Product({ params: { product } }: PageProps) {
  return (
    <>
      <ProductList product={product} />
    </>
  );
}

export default Product;
