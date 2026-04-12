import { useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { Buttons } from '@/components/shared/Buttons';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { AdminNutritionDashboard } from '@/components/features/AdminNutritionDashboard';
import {
  InputField,
  SwitchField,
  SelectField,
  CheckboxField,
} from '@/components/features/AdminInputField';
import { PokeContentSetRow, OtherContentSetRow } from '@/components/features/AdminContentSet';
import { useProductsForm } from '@/hooks/useProductsForm';

const defaultImageUrl =
  'https://storage.googleapis.com/vue-course-api.appspot.com/greengo/1775233794775.png';

export const ProductDetailPage = ({
  isOpenModal,
  onOpenChange,
  layoutContent,
  allProducts,
  formProductValue,
  modalType,
  category,
  formDefaultValue,
  getProducts,
}) => {
  /* poke碗新增內容物區的 select 內容 ---> 將食材都放進select的options裡 */
  const contentSetSelectContent = useMemo(() => {
    const options = allProducts
      .filter((item) => item.category === 'ingredients')
      .map((i) => ({
        text: i.title,
        value: i.key,
        type: i.type,
        costPrice: i.costPrice,
        costCapacity: i.costCapacity,
        nutrition: {
          calories: i.nutrition?.calories,
          proteinGrams: i.nutrition?.proteinGrams,
          carbsGrams: i.nutrition?.carbsGrams,
          fatGrams: i.nutrition?.fatGrams,
        },
      }));
    return {
      placeholder: '請選擇食材',
      options: options,
    };
  }, [allProducts]);

  /* useProductsForm 表單設定 */
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    contentSetTotal,
    postProduct,
    cancelProduct,
    imageUrl,
    type,
  } = useProductsForm({
    modalType,
    formDefaultValue,
    formProductValue,
    contentSetSelectContent,
    onOpenChange,
    getProducts,
  });

  /* useFieldArray 內容物區塊設定 */
  const { fields, append, remove } = useFieldArray({ control, name: 'contentSet' });

  /* 透過 config 的 component 欄位切換 fields 的類別 */
  const renderComponent = {
    input: InputField,
    select: SelectField,
    switch: SwitchField,
    checkbox: CheckboxField,
  };

  const renderTitle = (category) => {
    switch (category) {
      case 'ingredients':
        return '食材';
      case 'fixedPokes':
        return '固定poke碗';
      case 'otherProducts':
        return '其他產品';
      default:
        break;
    }
  };

  const sections = layoutContent(category, type);

  return (
    <Dialog open={isOpenModal} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl sm:max-w-300 bg-surface p-0 overflow-hidden gap-0"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        {/* dialog header */}
        <DialogHeader className="pt-5 pb-1 px-8 bg-surface">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-lg font-semibold text-on-surface">
                {modalType === 'create' ? '新增產品' : `編輯${renderTitle(category)}`}
              </span>
              <p className="text-md text-on-surface-variant font-medium">{formProductValue?.id}</p>
            </div>
            <div className="flex gap-3">
              <Buttons variant="secondary" size="lg" onClick={cancelProduct}>
                取消
              </Buttons>
              <Buttons variant="default" size="lg" type="submit" form="ingredients">
                儲存
              </Buttons>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            編輯食材的詳細資訊，包含庫存、營養素與售價設定。
          </DialogDescription>
        </DialogHeader>

        {/* dialog main */}
        <div className="max-h-[88vh] flex justify-between ">
          <ScrollArea type="always" className="w-110 shrink-0 mr-1 my-1 pt-6 pb-4">
            <div className="px-8 ">
              {/* ---- 左側自動計算區 ---- */}
              <AdminNutritionDashboard
                control={control}
                category={category}
                contentSetTotal={contentSetTotal}
                contentSetSelectContent={contentSetSelectContent}
              />
            </div>
          </ScrollArea>
          <ScrollArea type="always" className="flex-1 mr-1 mt-1 pt-6 pb-4">
            <div className="px-11 border-l border-border">
              <form onSubmit={handleSubmit(postProduct)} id="ingredients">
                {/* ---- 右側資料輸入區 ---- */}
                {sections?.map((section) => {
                  if (!section) return null;
                  return (
                    <>
                      <FieldSet key={section?.id}>
                        <FieldLegend>{section?.title}</FieldLegend>
                        <FieldDescription className="whitespace-break-spaces">
                          {section?.description}
                        </FieldDescription>
                        <FieldGroup className="grid grid-cols-2 gap-x-8 gap-y-5">
                          {section?.fields.map((field) => {
                            if (!field) return null;
                            const Component = renderComponent[field.component];

                            return (
                              <div className={field.grid}>
                                {/* 輸入框 */}
                                <Component
                                  key={field.fieldId} // common
                                  register={register} // input
                                  errors={errors} // common
                                  control={control} // common
                                  isReadOnly={field.isReadOnly} // input
                                  fieldText={field.fieldText} // common
                                  fieldType={field.fieldType} // common
                                  fieldId={field.fieldId} // common
                                  dataKeyId={field.dataKeyId}
                                  placeholder={field.placeholder} // input
                                  fieldRules={field.fieldRules} // common
                                  selectContent={field.selectContent} // select
                                  specialNumberStep={field.specialNumberStep} // input的營養素
                                  checkboxContent={field.checkboxContent} // checkbox
                                />
                                {/* 圖片展示 */}
                                {field.fieldId === 'imageUrl' && (
                                  <div className="col-span-2 mt-4">
                                    <img
                                      src={imageUrl ? imageUrl : defaultImageUrl}
                                      alt="產品圖片"
                                      className="rounded-lg"
                                    />
                                  </div>
                                )}
                                {/* poke 碗系統試算提示 */}
                                {category === 'fixedPokes' && section.id === 'onSale' && (
                                  <p className="text-sm text-primary mt-1">
                                    系統試算：{contentSetTotal()?.[field.fieldId].toFixed()}
                                    {field.fieldId === 'price' ? ' 元' : ' g'}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                          {/* poke 碗內容物設計 */}
                          {category === 'fixedPokes' && section.id === 'content' && (
                            <div className="border border-border rounded-md col-span-2">
                              <div className="grid grid-cols-[1fr_88px_240px_40px_20px] gap-x-5 p-3 items-center bg-surface-dim rounded-t-md">
                                <div className="font-medium">使用食材</div>
                                <div className="font-medium">使用克數</div>
                                <div className="font-medium">營養素</div>
                                <div className="font-medium text-center">金額</div>
                                <div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    className="size-6"
                                    onClick={() => append({ name: '', capacity: 0 })}
                                  >
                                    <Icons.add />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-y-3 px-3 py-5">
                                {fields.map((item, index) => (
                                  <PokeContentSetRow
                                    item={item}
                                    index={index}
                                    key={item.id}
                                    control={control}
                                    register={register}
                                    remove={remove}
                                    contentSetSelectContent={contentSetSelectContent}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          {category === 'otherProducts' && section.id === 'content' && (
                            <div className="border border-border rounded-md col-span-2">
                              <div className="grid grid-cols-[1fr_20px] gap-x-5 py-3 px-5 items-center bg-surface-dim rounded-t-md">
                                <div className="font-medium">使用原料</div>
                                <div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    className="size-6"
                                    onClick={() => append({ name: '' })}
                                  >
                                    <Icons.add />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-y-3 px-3 py-5">
                                {fields.map((item, index) => (
                                  <OtherContentSetRow
                                    item={item}
                                    index={index}
                                    key={item.id}
                                    register={register}
                                    remove={remove}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </FieldGroup>
                      </FieldSet>
                      <FieldSeparator className="my-6 opacity-50" />
                    </>
                  );
                })}

                <FieldSeparator className="my-6 opacity-0" />
              </form>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
