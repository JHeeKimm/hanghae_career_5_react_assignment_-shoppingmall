import { NewProductDTO } from '@/api/dtos/productDTO';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ALL_CATEGORY_ID, categories } from '@/constants';
import { createNewProduct, initialProductState } from '@/helpers/product';
import { useAddProduct } from '@/lib/hooks/useAddProduct';
import { useToastStore } from '@/store/useToastStore';
import { uploadImage } from '@/utils/imageUpload';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose, onProductAdded }) => {
  const { mutate: addProduct } = useAddProduct();
  const { addToast } = useToastStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NewProductDTO>();
  // const selectedImage = watch('image') as File | null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 선택된 파일을 폼 상태에 설정 (setValue)
      setValue('image', files[0]);
    }
  };

  const handleProductSubmit = async (data: NewProductDTO): Promise<void> => {
    try {
      const selectedImage = getValues('image');
      if (!selectedImage) {
        throw new Error('이미지를 선택해야 합니다.');
      }

      const imageUrl = await uploadImage(selectedImage as File);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const newProduct = createNewProduct(data, imageUrl);
      await addProduct(newProduct);
      addToast('success', '물품 등록에 성공했습니다.');
      onClose();
      onProductAdded();
      reset();
    } catch (error) {
      if (error instanceof Error) {
        addToast('error', error.message);
      } else {
        addToast('error', '물품 등록에 실패했습니다.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleProductSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register('title', { required: '상품명을 입력해주세요' })}
              placeholder="상품명"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <Input
              {...register('price', {
                required: '가격을 입력해주세요',
                valueAsNumber: true,
              })}
              type="number"
              placeholder="가격"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
            <Textarea
              {...register('description')}
              className="resize-none"
              placeholder="상품 설명"
            />
            <Select
              onValueChange={(value) => setValue('category.id', value)}
              {...register('category.id', {
                required: '카테고리를 선택해주세요',
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((category) => category.id !== ALL_CATEGORY_ID)
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.category?.id && (
              <p className="text-red-500">{errors.category.id.message}</p>
            )}
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
