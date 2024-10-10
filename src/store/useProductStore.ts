import { create } from 'zustand';
import { ProductSliceState } from '@/types/productType';
import { IProduct, NewProductDTO } from '@/api/dtos/productDTO';

interface ProductStates extends ProductSliceState {
  setAdd: (newProduct: IProduct) => void;
  setError: () => void;
}

export const useProductStore = create<ProductStates>((set) => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
  setAdd: (newProduct: IProduct) =>
    set((state) => ({
      items: [newProduct, ...state.items],
      totalCount: state.totalCount + 1,
      error: null,
    })),
  setError: () =>
    set({
      error: '상품 등록에 실패하였습니다.',
    }),
}));
