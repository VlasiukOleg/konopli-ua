import ProductCard from "@/components/ui/ProductCard/ProductCard";

import productList from "@/data/productList.json";

interface IProductListProps {
  product: string;
}

const ProductList: React.FC<IProductListProps> = ({ product }) => {
  const filteredProductsByCategory = productList.filter((productItem) =>
    productItem.category.includes(product)
  );

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProductsByCategory.map((filteredProduct) => (
            <ProductCard key={filteredProduct.id} product={filteredProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
