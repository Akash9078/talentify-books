import { Product } from '../../utils/fetchProducts';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

