'use client';
import { getProductCategories } from '@/service/products';
import { validateFiles } from '@/utils/validation';
import { Select, SelectItem, Button, Chip, Input, Textarea, SelectedItems, Selection, Switch } from '@nextui-org/react';
import { IconCategory2, IconChecks, IconPhotoSpark, IconSparkles, IconStack, IconWriting } from '@tabler/icons-react';
import { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

interface IProductsFormProps {
  product?: Partial<TProduct>;
  onSubmit: (product: createProductPayload | editProductPayload) => void;
}

const MAX_MEDIA_FILES = 5;
const MAX_MEDIA_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProductsForm = ({ product, onSubmit }: IProductsFormProps) => {
  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryFn: () => getProductCategories(),
    queryKey: 'product-categories',
  });

  const defaultProductVisibility = product?.isHidden ?? false;
  const [isPublicProduct, setIsPublicProduct] = useState<boolean>(!defaultProductVisibility);
  const [selectedCategories, setSelectedCategories] = useState<TProductCategory[]>(
    product?.categories ? product.categories : []
  );
  const [selectedCategoriesKeys, setSelectedCategoriesKeys] = useState<Selection>(
    new Set([...selectedCategories.map((category) => category.id)])
  );

  const productForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (selectedCategoriesKeys === 'all') {
      setSelectedCategories(categories || []);
    } else {
      setSelectedCategories(categories?.filter((category) => selectedCategoriesKeys.has(category.id)) || []);
    }
  }, [categories, selectedCategoriesKeys]);

  const handleSubmit: FormEventHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(productForm.current ?? undefined);

    if (
      validateFiles({
        files: formData.getAll('mediafiles') as File[],
        maxFiles: MAX_MEDIA_FILES,
        maxSize: MAX_MEDIA_FILE_SIZE,
      })
    ) {
      return;
    }

    const PayloadProduct: createProductPayload = {
      product: {
        name: formData.get('name') as string,
        price: Number(formData.get('price')),
        description: formData.get('description') as string,
        stock: Number(formData.get('stock')),
        categories: selectedCategories.map((category) => category.id),
        isHidden: !isPublicProduct,
      },
    };
    onSubmit(PayloadProduct);
  };

  const handleCancel = () => {
    // TODO: Implement cancel action
  };

  // TODO: Detect shop currency to set the correct currency symbol
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" ref={productForm}>
      <div className="flex gap-4">
        <Input
          type="text"
          name="name"
          startContent={<IconSparkles size={16} className="text-default-400" />}
          label="Name"
          labelPlacement="outside"
          placeholder="Name"
          description="This name will be displayed in the store."
          variant="faded"
          defaultValue={product?.name}
          isRequired
          required
        />
        <Switch
          className="w-full"
          type="switch"
          name="isHidden"
          color="success"
          isSelected={isPublicProduct}
          onChange={() => setIsPublicProduct(!isPublicProduct)}
        >
          Public for customers
        </Switch>
      </div>
      <Textarea
        name="description"
        startContent={<IconWriting size={16} className="text-default-400" />}
        label="Description"
        labelPlacement="outside"
        placeholder="Description"
        description="Include details about the product."
        variant="faded"
        defaultValue={product?.description}
      />
      <Input
        type="file"
        name="mediafiles"
        startContent={<IconPhotoSpark size={16} className="text-default-400" />}
        label="Product images"
        labelPlacement="outside"
        placeholder="Media files"
        description="Upload images to showcase the product."
        variant="faded"
        multiple
        accept="image/*"
      />
      <div className="inline-flex gap-4">
        <Input
          type="number"
          name="price"
          startContent={<span className="text-default-400 text-sm font-bold">$USD</span>}
          label="Price"
          labelPlacement="outside"
          placeholder="Price"
          description="Set the price for the product in shop currency."
          variant="faded"
          min={0}
          defaultValue={product?.price?.toString()}
          isRequired
          required
        />
        <Input
          type="number"
          name="stock"
          startContent={<IconStack size={16} className="text-default-400" />}
          label="Stock"
          labelPlacement="outside"
          placeholder="Stock"
          description="Amount of products available in stock."
          variant="faded"
          min={0}
          defaultValue={product?.stock?.toString()}
          isRequired
          required
        />
      </div>
      <Select
        name="categories"
        label="Categories"
        items={categories || []}
        selectedKeys={selectedCategoriesKeys}
        onSelectionChange={setSelectedCategoriesKeys}
        variant="faded"
        startContent={<IconCategory2 size={16} className="text-default-400" />}
        labelPlacement="outside"
        placeholder="Categories"
        description="Select the categories that best describe the product."
        selectionMode="multiple"
        isLoading={isCategoriesLoading}
        isDisabled={!isCategoriesSuccess}
        errorMessage={isCategoriesSuccess ? '' : 'Error loading categories.'}
        renderValue={(items: SelectedItems<TProductCategory>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key} color="secondary" variant="flat" size="sm" className="capitalize px-2">
                  {item.data?.name}
                </Chip>
              ))}
            </div>
          );
        }}
      >
        {(category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        )}
      </Select>
      <div className="text-default-500 text-sm">
        Can&apos;t find a category?
        <Button color="default" variant="light" size="sm" className="text-sm text-primary-500 underline px-1">
          Add a new category.
        </Button>
      </div>
      <div className="self-end inline-flex gap-4">
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" color="primary" startContent={<IconChecks size={16} />}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ProductsForm;
