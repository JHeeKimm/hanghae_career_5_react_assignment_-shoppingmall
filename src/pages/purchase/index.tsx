import { Loader2 } from 'lucide-react';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { PHONE_PATTERN } from '@/constants';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { ItemList } from '@/pages/purchase/components/ItemList';
import { Payment } from '@/pages/purchase/components/Payment';
import { ShippingInformationForm } from '@/pages/purchase/components/ShippingInformationForm';

import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useMakePurchase } from '@/lib/hooks/useMakePurchase';

export interface FormData {
  name: string;
  address: string;
  phone: string;
  requests: string;
  payment: string;
}

export interface FormErrors {
  phone: string;
}

export const Purchase: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, initCart } = useCartStore();

  const [formData, setFormData] = useState<FormData>({
    name: user?.displayName ?? '',
    address: '',
    phone: '',
    requests: '',
    payment: 'accountTransfer',
  });
  const [errors, setErrors] = useState<FormErrors>({
    phone: '',
  });

  const isFormValid = useMemo(() => {
    const { address, phone } = formData;
    const isPhoneValid = PHONE_PATTERN.test(phone);
    return address.trim() !== '' && isPhoneValid;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'phone') {
        if (!PHONE_PATTERN.test(value) && value !== '') {
          setErrors((prev) => ({
            ...prev,
            phone: '-를 포함한 휴대폰 번호만 가능합니다',
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone: '' }));
        }
      }
    },
    [setFormData, setErrors]
  );

  useEffect(() => {
    if (user?.uid) {
      initCart(user.uid);
    }
  }, [user, initCart]);

  const { mutate: makePurchaseMutation, isPending: isLoading } =
    useMakePurchase();

  const handleClickPurchase = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isFormValid || !user) return;

      const purchaseData = {
        ...formData,
        totalAmount: 0,
        paymentMethod: formData.payment,
        shippingAddress: formData.address,
      };
      makePurchaseMutation({ purchaseData, userId: user.uid, cartData: cart });
    },
    [isFormValid, formData, user, cart]
  );

  return (
    <Layout
      containerClassName="pt-[30px]"
      authStatus={authStatusType.NEED_LOGIN}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleClickPurchase}>
            <ShippingInformationForm
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
            <ItemList />
            <Payment
              paymentMethod={formData.payment}
              onPaymentMethodChange={handleInputChange}
            />
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    처리 중...
                  </>
                ) : (
                  '구매하기'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};
