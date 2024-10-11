import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductSliceState } from '@/types/productType';
import { IProduct, NewProductDTO } from '@/api/dtos/productDTO';
import { addProductAPI } from '@/api/product';
import { useProductStore } from '@/store/useProductStore';

export const useAddProduct = () => {
  const { setAdd, setError } = useProductStore();
  const queryClient = useQueryClient();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: async (userData: NewProductDTO) => {
      return await addProductAPI(userData);
    },
    onSuccess: (newProduct) => {
      setAdd(newProduct);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      setError();
    },
  });
};
