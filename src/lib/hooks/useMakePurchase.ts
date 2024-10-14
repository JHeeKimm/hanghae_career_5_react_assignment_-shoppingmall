import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/store/useToastStore';
import { useCartStore } from '@/store/useCartStore';
import { useMutation } from '@tanstack/react-query';
import { PurchaseDTO } from '@/api/dtos/purchaseDTO';
import { CartItem } from '@/types/cartType';
import { makePurchase } from '@/api/purchase';
import { pageRoutes } from '@/apiRoutes';

interface MakePurchaseParams {
  purchaseData: PurchaseDTO;
  userId: string;
  cartData: CartItem[];
}

export const useMakePurchase = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { resetCart } = useCartStore();
  return useMutation<void, Error, MakePurchaseParams>({
    mutationFn: ({ purchaseData, userId, cartData }) =>
      makePurchase(purchaseData, userId, cartData),
    onSuccess: (_, user, __) => {
      resetCart(user.userId);
      addToast('success', '물품 구매에 성공했습니다.');
      navigate(pageRoutes.main);
    },
    onError: (error) => {
      addToast(
        'error',
        '물품 구매 중 오류가 발생했습니다. 다시 시도해 주세요.'
      );
      console.error('물품 구매 중 오류가 발생했습니다.', error.message);
    },
  });
};
