import { useWatch, Controller } from 'react-hook-form';
import { OneGroupSelects } from '@/components/shared/Selects';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';
import { calContentSetNumber } from '@/utils/calContentSetNumber';

/* poke content 內容物組成區塊(需元件化) */
export const PokeContentSetRow = ({
  item,
  index,
  control,
  register,
  remove,
  contentSetSelectContent,
}) => {
  const name = useWatch({ control, name: `contentSet.${index}.name` });
  const capacity = Number(useWatch({ control, name: `contentSet.${index}.capacity` }));
  const selectedItem = contentSetSelectContent.options.find((item) => item.value === name);

  const result = calContentSetNumber(selectedItem, capacity);

  return (
    <div className="grid grid-cols-[1fr_88px_240px_40px_20px] gap-x-5 items-center" key={item.id}>
      <div>
        <Controller
          name={`contentSet.${index}.name`}
          control={control}
          render={({ field }) => (
            <OneGroupSelects
              content={contentSetSelectContent}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Input type="number" {...register(`contentSet.${index}.capacity`)} />
      </div>
      <div>
        <p>
          <span>{result.calories.toFixed()} Kcal｜ </span>
          <span>P {result.proteinGrams.toFixed()} g｜ </span>
          <span>C {result.carbsGrams.toFixed()} g｜ </span>
          <span>F {result.fatGrams.toFixed()} g </span>
        </p>
      </div>
      <div className="text-center">
        <p>{result.price.toFixed()}</p>
      </div>
      <div>
        <Button
          type="button"
          variant="ghost"
          className="size-6"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          <Icons.delete />
        </Button>
      </div>
    </div>
  );
};

/* other content 內容物組成區塊(需元件化) */
export const OtherContentSetRow = ({ index, register, remove }) => {
  return (
    <div className="grid grid-cols-[1fr_40px] gap-x-5 items-center">
      <div>
        <Input
          type="text"
          placeholder="請輸入一項產品內容物"
          {...register(`contentSet.${index}.name`, { required: true })}
        />
      </div>
      <div>
        <Button
          type="button"
          variant="ghost"
          className="size-6 text-center"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
        >
          <Icons.delete />
        </Button>
      </div>
    </div>
  );
};
