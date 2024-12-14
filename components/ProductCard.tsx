'use client'

import { Product } from '../../utils/fetchProducts';
import { Button } from "@/components/ui/button"
import ImageCarousel from './ImageCarousel';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col h-full">
      <ImageCarousel images={product.images} title={product.title} />
      <div className="flex flex-col justify-between flex-grow mt-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title || 'Untitled Product'}</h3>
          <p className="text-xl font-bold text-gray-900 mb-4">{product.price || 'Price not available'}</p>
        </div>
        <Button 
          asChild
          className="w-full mt-auto"
        >
          <a href={product.link || '#'} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
        </Button>
      </div>
    </div>
  );
}

