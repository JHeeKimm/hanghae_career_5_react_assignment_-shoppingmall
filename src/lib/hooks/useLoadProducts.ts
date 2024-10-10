import { useQuery } from '@tanstack/react-query';
import { IProduct, PaginatedProductsDTO } from '@/api/dtos/productDTO';
import { fetchProducts } from '@/api/product';
import { useProductStore } from '@/store/useProductStore';
import { ProductFilter } from '@/types/productType';

export const useLoadProducts = (
  filter: ProductFilter,
  pageSize: number,
  page: number,
  isInitial: boolean
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', filter, pageSize, page],
    queryFn: () => fetchProducts(filter, pageSize, page),
  });

  return { data, error, isLoading, isInitial };
};
