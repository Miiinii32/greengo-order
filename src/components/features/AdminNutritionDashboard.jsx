import { useWatch } from 'react-hook-form';

/* component */
import { DonutChart } from '@/components/shared/DonutCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

export const AdminNutritionDashboard = ({ control, category, contentSetTotal }) => {
  /* 監聽營養素給圖表自動計算 */
  const calories = useWatch({ control, name: 'nutrition.calories' });
  const proteinGrams = useWatch({ control, name: 'nutrition.proteinGrams' });
  const carbsGrams = useWatch({ control, name: 'nutrition.carbsGrams' });
  const fatGrams = useWatch({ control, name: 'nutrition.fatGrams' });

  return (
    <FieldSet>
      <FieldLegend>自動計算區</FieldLegend>
      <FieldDescription>即時彙整營養數據，同步呈現動態視覺化圖表</FieldDescription>
      {category === 'fixedPokes' ? (
        <Tabs defaultValue="system">
          <TabsList className="m-auto mt-2">
            <TabsTrigger value="system">系統試算</TabsTrigger>
            <TabsTrigger value="input">手動輸入</TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <FieldGroup className="flex-col gap-8">
              <Field>
                <DonutChart
                  calories={contentSetTotal().calories}
                  proteinGrams={contentSetTotal().proteinGrams}
                  carbsGrams={contentSetTotal().carbsGrams}
                  fatGrams={contentSetTotal().fatGrams}
                />
              </Field>
            </FieldGroup>
          </TabsContent>
          <TabsContent value="input">
            <FieldGroup className="flex-col gap-8">
              <Field>
                <DonutChart
                  calories={calories}
                  proteinGrams={proteinGrams}
                  carbsGrams={carbsGrams}
                  fatGrams={fatGrams}
                />
              </Field>
            </FieldGroup>
          </TabsContent>
        </Tabs>
      ) : (
        <FieldGroup className="flex-col gap-8">
          <Field>
            <DonutChart
              calories={calories}
              proteinGrams={proteinGrams}
              carbsGrams={carbsGrams}
              fatGrams={fatGrams}
            />
          </Field>
        </FieldGroup>
      )}
    </FieldSet>
  );
};
