// hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { FirestoreProduct, productService } from '../Services/firebaseService';

export const useProducts = () => {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await productService.getAllProducts();

        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch
  };
};