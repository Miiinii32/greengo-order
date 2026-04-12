import get from 'lodash/get';
import { useWatch, Controller } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { OneGroupSelects } from '@/components/shared/Selects';

/* InputField 元件 */
export const InputField = ({
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
    defaultValue: fieldId === 'costCapacity' ? 100 : fieldId === 'unit' ? '份' : '---',
  });

  return (
    <Field>
      <FieldLabel htmlFor={isReadOnly ? undefined : fieldId}>
        {fieldText}
        {isRequired && <span className="text-error text-md">*</span>}
      </FieldLabel>
      {isReadOnly ? (
        <p>{currentValue}</p>
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

/* switchField 元件 */
export const SwitchField = ({ control, errors, fieldText, fieldId }) => {
  return (
    <Field>
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

/* selectField 元件 */
export const SelectField = ({ control, errors, fieldText, fieldId, selectContent, fieldRules }) => {
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
        render={({ field, fieldState: { error } }) => (
          <OneGroupSelects
            id={fieldId}
            content={selectContent}
            value={field.value}
            onValueChange={field.onChange}
            aria-invalid={!!error}
          />
        )}
      />

      {errors[fieldId] && <p className="text-error text-sm ml-1.5">{errors[fieldId].message}</p>}
    </Field>
  );
};

/* checkboxField 元件 */
export const CheckboxField = ({ control, fieldText, fieldId, checkboxContent }) => {
  return (
    <Field>
      <FieldLabel>{fieldText}</FieldLabel>
      <div className="flex gap-6 flex-wrap">
        <Controller
          name={fieldId}
          control={control}
          render={({ field }) =>
            checkboxContent?.map((item) => (
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
