import { useForm, Controller, useWatch } from 'react-hook-form';
import { Buttons } from '@/components/shared/Buttons';
import { OneGroupSelects } from '@/components/shared/Selects';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { DonutChart } from '@/components/shared/DonutCharts';
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
import { SELECT_OPTIONS } from '@/config/admin/selectOptions';
import { CHECKBOX_OPTIONS } from '@/config/admin/checkboxOptions';
import { useEffect } from 'react';
import get from 'lodash/get';
import { Label } from '@/components/ui/label';

/* InputField component */
const InputField = ({
  register,
  errors,
  control,
  isReadOnly,
  fieldText,
  fieldType,
  fieldId, // input 和 lebal 串連id
  dataKeyId, // 存入 data 的 key
  fieldRules,
  placeholder,
  specialNumberStep,
}) => {
  const extendedRules = {
    ...fieldRules,
    valueAsNumber: fieldType === 'number',
  };
  const isRequired = !!fieldRules?.required; // 判斷rules有沒有required 決定是否出現必填星星
  const error = get(errors, dataKeyId); // 由lodash 的 get 找到巢狀結構的錯誤key
  const currentValue = useWatch({
    control,
    name: dataKeyId,
  });
  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>
        {fieldText}
        {isRequired && <span className="text-error text-md">*</span>}
      </FieldLabel>
      {isReadOnly ? (
        <div>
          <p>{currentValue ?? '---'}</p>
          <Input type="hidden" id={fieldId} {...register(dataKeyId, extendedRules)} />
        </div>
      ) : (
        <Input
          type={fieldType}
          step={fieldType === 'number' ? specialNumberStep : ''}
          id={fieldId}
          placeholder={placeholder}
          aria-invalid={!!error}
          {...register(dataKeyId, extendedRules)}
        />
      )}
      {error && !isReadOnly && <p className="text-error text-sm ml-1.5">{error.message}</p>}
    </Field>
  );
};
/* switch component */
const SwitchField = ({ control, errors, fieldText, fieldId }) => {
  return (
    <Field>
      {/* 是否上架 isEnabled */}
      <FieldLabel htmlFor={fieldId}>{fieldText}</FieldLabel>
      <div className="flex gap-3">
        <Controller
          name={fieldId}
          control={control}
          render={({ field }) => (
            <Switch id={fieldId} checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      {errors?.[fieldId] && (
        <p className="text-error text-sm ml-1.5">{errors?.[fieldId].message}</p>
      )}
    </Field>
  );
};
/* select component */
const SelectField = ({ control, errors, fieldText, fieldId, selectContent, fieldRules }) => {
  const isRequired = !!fieldRules?.required;

  return (
    <Field>
      <FieldLabel htmlFor={fieldId}>
        {fieldText}
        {isRequired && <span className="text-error text-md">*</span>}
      </FieldLabel>

      <Controller
        name={fieldId}
        control={control}
        rules={fieldRules}
        render={({ field }) => (
          <OneGroupSelects
            type="hidden"
            content={selectContent}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      />

      {errors[fieldId] && <p className="text-error text-sm ml-1.5">{errors[fieldId].message}</p>}
    </Field>
  );
};
/* checkbox component */
const CheckboxField = ({ control, fieldText, fieldId, checkboxContent }) => {
  return (
    <Field>
      <FieldLabel>{fieldText}</FieldLabel>
      <div className="flex gap-6 flex-wrap">
        <Controller
          name={fieldId}
          control={control}
          render={({ field }) =>
            checkboxContent.map((item) => (
              <div className="flex gap-2 wrap-normal items-center" key={item.value}>
                <Checkbox
                  id={item.value}
                  name={fieldId}
                  checked={field.value?.includes(item.value)}
                  onCheckedChange={(checked) => {
                    const saftyFieldValue = Array.isArray(field.value) ? field.value : [];
                    const result = checked
                      ? [...saftyFieldValue, item.value]
                      : saftyFieldValue?.filter((i) => i !== item.value);
                    field.onChange(result);
                  }}
                />
                <Label htmlFor={item.value} className="text-on-surface text-sm font-normal">
                  {item.text}
                </Label>
              </div>
            ))
          }
        />
      </div>
    </Field>
  );
};

export const ProductDetailPage = ({ isOpenModal, onOpenChange, productContent }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      stockQuantity: 0,
      isEnabled: false,
      imageUrl: '',
      title: '',
      unit: '份',
      description: '',
      type: '',
      costPrice: 0,
      costCapacity: 100,
      costNutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
      price: 0,
      capacity: 0,
      suitableTypeTag: [],
      allergenTag: [],
    },
  });

  useEffect(() => {
    reset(productContent);
  }, [reset, productContent]);

  const postProduct = (data) => {
    const resultProductContent = { ...data, originPrice: 0 };
    console.log(resultProductContent);
    console.log(productContent);
  };

  /* 監聽營養素讓左側頁面自動計算 */
  const caloriesValue = useWatch({ control, name: 'costNutrition.calories' });
  const proteinValue = useWatch({ control, name: 'costNutrition.protein' });
  const carbsValue = useWatch({ control, name: 'costNutrition.carbs' });
  const fatValue = useWatch({ control, name: 'costNutrition.fat' });
  const imageUrl = useWatch({ control, name: 'imageUrl' });
  const costPrice = useWatch({ control, name: 'costPrice' });
  const costCapacity = useWatch({ control, name: 'costCapacity' });
  const capacity = useWatch({ control, name: 'capacity' });

  return (
    <Dialog open={isOpenModal} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl sm:max-w-250 bg-surface p-0 overflow-hidden gap-0"
      >
        {/* dialog header */}
        <DialogHeader className="pt-5 pb-1 px-8 bg-surface">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-lg font-semibold text-on-surface">編輯食材</span>
              <p className="text-md text-primary font-medium">{productContent?.id}</p>
            </div>
            <div className="flex gap-3">
              <DialogClose asChild>
                <Buttons variant="secondary" size="lg">
                  取消
                </Buttons>
              </DialogClose>
              <DialogClose asChild>
                <Buttons variant="default" size="lg" type="submit" form="ingredients">
                  儲存
                </Buttons>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            編輯食材的詳細資訊，包含庫存、營養素與售價設定。
          </DialogDescription>
        </DialogHeader>

        {/* dialog main */}
        <div className="max-h-[88vh] flex justify-between ">
          <ScrollArea type="always" className="w-2/5 mr-1 my-1 pt-6 pb-4">
            <div className="px-8 ">
              {/* ---- 左側自動計算區 ---- */}
              <FieldSet>
                <FieldLegend>自動計算區</FieldLegend>
                <FieldGroup className="flex-col gap-8">
                  {/* <Field>
                    <FieldLabel>總金額</FieldLabel>
                    <div className="p-4 flex justify-between bg-surface-dim/80 rounded-md">
                      <p className="body-2-emphasis">總金額</p>
                      <p className="h6 text-on-surface-dim-variant">$ 345.5</p>
                    </div>
                  </Field> */}

                  <Field>
                    <FieldLabel htmlFor="stockQuantity">計算營養素</FieldLabel>
                    <DonutChart
                      caloriesValue={caloriesValue}
                      proteinValue={proteinValue}
                      carbsValue={carbsValue}
                      fatValue={fatValue}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </ScrollArea>
          <ScrollArea type="always" className="w-3/5 mr-1 mt-1 pt-6 pb-4">
            <div className="px-11 border-l border-border">
              <form onSubmit={handleSubmit(postProduct)} id="ingredients">
                {/* ---- 右側資料輸入區 ---- */}
                <FieldSet>
                  <FieldLegend>庫存與上架</FieldLegend>
                  <FieldDescription>調整庫存與上架前台供點餐與否</FieldDescription>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      {/* 庫存量 stockQuantity */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="庫存量"
                        fieldType="number"
                        fieldId="stockQuantity"
                        dataKeyId="stockQuantity"
                        placeholder="請輸入目前庫存量"
                        fieldRules={{ required: '必填' }}
                      />

                      {/* 是否上架 isEnabled */}
                      <SwitchField
                        control={control}
                        errors={errors}
                        fieldText="是否上架"
                        fieldId="isEnabled"
                      />
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 基本設定 */}
                <FieldSet>
                  <FieldLegend>基本設定</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      {/* 產品名稱 title */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="產品名稱"
                        fieldType="text"
                        fieldId="title"
                        dataKeyId="title"
                        placeholder="請輸入目前庫存量"
                        fieldRules={{
                          required: '必填',
                          maxLength: { value: 5, message: '產品名稱最多5個字' },
                        }}
                      />

                      {/* 單位 unit */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={true}
                        fieldText="單位"
                        fieldType="text"
                        fieldId="unit"
                        dataKeyId="unit"
                        fieldRules={{
                          required: '必填',
                        }}
                      />
                    </div>
                    <div className="flex gap-8">
                      {/* 產品介紹 description */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="產品介紹"
                        fieldType="text"
                        fieldId="description"
                        dataKeyId="description"
                        placeholder="請輸入產品介紹"
                        fieldRules={{
                          maxLength: { value: 10, message: '產品名介紹不得超過10個字' },
                        }}
                      />
                    </div>
                    <div className="flex gap-8">
                      {/* 分類 category */}
                      <SelectField
                        errors={errors}
                        control={control}
                        fieldText="產品分類"
                        fieldId="category"
                        selectContent={SELECT_OPTIONS.products.category}
                        fieldRules={{ required: '必填' }}
                      />

                      {/* 類別 type */}
                      <SelectField
                        errors={errors}
                        control={control}
                        fieldText="產品類別"
                        fieldId="type"
                        selectContent={SELECT_OPTIONS.products.ingredients.type}
                        fieldRules={{ required: '必填' }}
                      />
                    </div>
                    <div className="flex gap-8">
                      {/* 上傳圖片 imageUrl */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="上傳圖片"
                        fieldType="text"
                        fieldId="imageUrl"
                        dataKeyId="imageUrl"
                        placeholder="請輸入圖片網址"
                      />
                    </div>
                    <div>
                      {/* 圖片展示 */}
                      <img src={imageUrl} alt="產品圖片" className="rounded-lg" />
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 成本設定 */}
                <FieldSet>
                  <FieldLegend>成本設定</FieldLegend>
                  <FieldDescription>數值均以基本份量為統計基準</FieldDescription>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      {/* 成本價格 costPrice */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="成本價格"
                        fieldType="number"
                        fieldId="costPrice"
                        dataKeyId="costPrice"
                        placeholder="請輸入每100g的成本價"
                        fieldRules={{
                          required: '必填',
                          min: {
                            value: 0,
                            message: '金額不可低於0元',
                          },
                        }}
                      />
                      {/* 基本份量 costCapacity */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={true}
                        fieldText="基本份量(g)"
                        fieldType="number"
                        fieldId="costCapacity"
                        dataKeyId="costCapacity"
                        fieldRules={{ required: '必填' }}
                      />
                    </div>
                    <div className="flex gap-8">
                      {/* 熱量 calories */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="熱量(g)"
                        fieldType="number"
                        specialNumberStep="0.1"
                        fieldId="calories"
                        dataKeyId="costNutrition.calories"
                        placeholder="請輸入每100g的食材熱量"
                        fieldRules={{
                          required: '必填',
                        }}
                      />
                      {/* 蛋白量 protein */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="蛋白量(g)"
                        fieldType="number"
                        specialNumberStep="0.1"
                        fieldId="protein"
                        dataKeyId="costNutrition.protein"
                        placeholder="請輸入每100g的蛋白量"
                        fieldRules={{
                          required: '必填',
                        }}
                      />

                      {/* 碳水量 carbs */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="碳水量(g)"
                        fieldType="number"
                        specialNumberStep="0.1"
                        fieldId="carbs"
                        dataKeyId="costNutrition.carbs"
                        placeholder="請輸入每100g的食材碳水量"
                        fieldRules={{
                          required: '必填',
                        }}
                      />

                      {/* 脂肪量 fat */}
                      <InputField
                        register={register}
                        errors={errors}
                        control={control}
                        isReadOnly={false}
                        fieldText="脂肪量(g)"
                        fieldType="number"
                        specialNumberStep="0.1"
                        fieldId="fat"
                        dataKeyId="costNutrition.fat"
                        placeholder="請輸入每100g的脂肪量"
                        fieldRules={{
                          required: '必填',
                        }}
                      />
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 上架設定 */}
                <FieldSet>
                  <FieldLegend>上架設定</FieldLegend>
                  <FieldDescription>此金額與份量將作為 Poke 碗組裝時的計算基準</FieldDescription>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <div className="w-1/2">
                        {/* 上架售價 price */}
                        <InputField
                          register={register}
                          errors={errors}
                          control={control}
                          isReadOnly={false}
                          fieldText="上架售價"
                          fieldType="number"
                          fieldId="price"
                          dataKeyId="price"
                          placeholder="請輸入上架售價"
                          fieldRules={{
                            required: '必填',
                            min: {
                              value: 0,
                              message: '金額不得小於零',
                            },
                          }}
                        />
                        <p className="text-sm text-primary mt-1">
                          建議上架售價：{(costPrice / costCapacity) * capacity * 3} 元
                        </p>
                      </div>
                      <div className="w-1/2">
                        {/* 上架份量 capacity */}
                        <InputField
                          register={register}
                          errors={errors}
                          control={control}
                          isReadOnly={false}
                          fieldText="上架份量(g)"
                          fieldType="number"
                          fieldId="capacity"
                          dataKeyId="capacity"
                          placeholder="請輸入上架份量"
                          fieldRules={{
                            required: '必填',
                            min: {
                              value: 0,
                              message: '份量不得小於零',
                            },
                          }}
                        />
                      </div>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 標籤設定 */}
                <FieldSet>
                  <FieldLegend>標籤設定</FieldLegend>
                  <FieldDescription>
                    - 類別標籤: 用於 Poke 碗推薦分類（如輕食、高蛋白...）
                    <br />- 過敏標籤: 紀錄食材過敏內容
                  </FieldDescription>

                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      {/* 類別標籤 suitableTypeTag */}
                      <CheckboxField
                        control={control}
                        fieldText="類別標籤"
                        fieldId="suitableTypeTag"
                        checkboxContent={
                          CHECKBOX_OPTIONS.products.ingredients.suitableTypeTag.options
                        }
                      />
                    </div>
                  </FieldGroup>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      {/* 過敏標籤 allergenTag */}
                      <CheckboxField
                        control={control}
                        fieldText="過敏標籤"
                        fieldId="allergenTag"
                        checkboxContent={CHECKBOX_OPTIONS.products.ingredients.allergenTag.options}
                      />
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-0" />
              </form>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
