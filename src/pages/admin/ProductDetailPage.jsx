import { Buttons } from '@/components/shared/Buttons';
import { OneGroupSelects } from '@/components/shared/Selects';
import { Label } from '@/components/ui/label';
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
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { TYPE_SELECT } from '@/config/admin/typeSelect';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '@/components/shared/Icons';
import { DonutChart } from '@/components/shared/DonutCharts';

export const ProductDetailPage = ({ isOpenModal, onOpenChange }) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl sm:max-w-250 bg-surface p-0 overflow-hidden gap-0"
      >
        {/* dialog header */}
        <DialogHeader className="pt-6 pb-5 px-8 bg-surface shadow-lg shadow-surface-dim border-b border-outline-light">
          <DialogTitle className="  flex justify-between">
            <span className="text-lg font-semibold text-on-surface">編輯食材</span>
            <Buttons variant="secondary">
              <Icons.edit />
              編輯
            </Buttons>
          </DialogTitle>
        </DialogHeader>

        {/* dialog main */}
        <div className="max-h-[88vh] flex justify-between ">
          <ScrollArea type="always" className="w-2/5 mr-1 my-1 pt-6 pb-4">
            <div className="px-8 ">
              {/* 計算金額 & 營養素 */}
              <FieldSet>
                <FieldLegend>金額與營養素</FieldLegend>
                <FieldGroup className="flex-col gap-8">
                  <Field>
                    <FieldLabel>總金額</FieldLabel>
                    <div className="p-4 flex justify-between bg-surface-dim/80 rounded-md">
                      <p className="body-2-emphasis">總金額</p>
                      <p className="h6 text-primary">$ 345.5</p>
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="stockQuantity">營養素計算</FieldLabel>
                    <DonutChart />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </ScrollArea>
          <ScrollArea type="always" className="w-3/5 mr-1 mt-1 pt-6 pb-4">
            <div className="px-11 border-l border-outline-light">
              <form>
                {/* 庫存與上架 */}
                <FieldSet>
                  <FieldLegend>庫存與上架</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="stockQuantity">庫存量</FieldLabel>
                        <Input type="number" id="stockQuantity" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="stockQuantity">是否上架</FieldLabel>
                        <div className="flex gap-3">
                          <Switch />
                          <Label className="text-on-surface font-normal">上架</Label>
                        </div>
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 基本設定 */}
                <FieldSet>
                  <FieldLegend>基本設定</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <FieldLabel htmlFor="title">上傳圖片</FieldLabel>
                    </div>
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="title">產品名稱</FieldLabel>
                        <Input id="title" name="title" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="unit">單位</FieldLabel>
                        <Input id="unit" name="unit" placeholder="例如：碗/杯/份..." required />
                      </Field>
                    </div>
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="description">產品介紹</FieldLabel>
                        <Input
                          id="description"
                          name="description"
                          placeholder="介紹文字請介於10-15字"
                          required
                        />
                      </Field>
                    </div>
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="category">分類</FieldLabel>
                        <OneGroupSelects content={TYPE_SELECT.ingredients} />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="type">類別</FieldLabel>
                        <OneGroupSelects content={TYPE_SELECT.ingredients} />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 成本設定 */}
                <FieldSet>
                  <FieldLegend>成本設定</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="costPrice">成本價</FieldLabel>
                        <Input id="costPrice" name="costPrice" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="costCaoaciry">基本份量</FieldLabel>
                        <Input id="costCaoaciry" name="costCaoaciry" required />
                      </Field>
                    </div>
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="calories">熱量 Kcal</FieldLabel>
                        <Input id="calories" name="calories" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="protein">蛋白質 g</FieldLabel>
                        <Input id="protein" name="protein" required />
                      </Field>
                    </div>
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="carbs">碳水 g</FieldLabel>
                        <Input id="carbs" name="carbs" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="fat">脂肪 g</FieldLabel>
                        <Input id="fat" name="fat" required />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 上架設定 */}
                <FieldSet>
                  <FieldLegend>上架設定</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="price">上架售價</FieldLabel>
                        <Input id="price" name="price" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="capacity">上架份量</FieldLabel>
                        <Input id="capacity" name="capacity" required />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-50" />

                {/* 標籤設定 */}
                <FieldSet>
                  <FieldLegend>標籤設定</FieldLegend>
                  <FieldGroup className="flex-col gap-5">
                    <div className="flex gap-8">
                      <Field>
                        <FieldLabel htmlFor="suitableTypeTag">類別標籤</FieldLabel>
                        <OneGroupSelects content={TYPE_SELECT.ingredients} />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="allergenTag">過敏標籤</FieldLabel>
                        <OneGroupSelects content={TYPE_SELECT.ingredients} />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator className="my-6 opacity-0" />
              </form>
            </div>
          </ScrollArea>
        </div>

        {/* dialog footer */}
        {/* <DialogFooter className="py-4 px-6">
          <DialogClose asChild>
            <Buttons variant="secondary">取消</Buttons>
          </DialogClose>
          <Buttons variant="default">儲存</Buttons>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
