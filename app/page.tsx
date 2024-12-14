import ProductGrid from './components/ProductGrid';
import { fetchProducts } from '../utils/fetchProducts';

export default async function Home() {
  try {
    const products = await fetchProducts();

    if (products.length === 0) {
      return (
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Talentify Books</h1>
          <p className="text-center">No products found. Please check your Google Sheet.</p>
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Talentify Books</h1>
        <ProductGrid products={products} />
      </main>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <p className="text-center text-red-500">
          Error loading products. Please try again later. 
          {error instanceof Error ? ` Details: ${error.message}` : ''}
        </p>
      </main>
    );
  }
}

