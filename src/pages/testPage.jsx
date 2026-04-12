{
  /* 高級table 設計 */
}
// import { ChartAreaInteractive } from '@/components/chart-area-interactive';
// import { SectionCards } from '@/components/section-cards';
// import { DataTable } from '@/components/data-table';
// import data from '@/app/dashboard/data.json';

{
  /* 高級table 設計 */
}

{
  /* <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div> */
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, useFieldArray } from 'react-hook-form';
export const TestPages = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      interests: [{ name: '' }], // 預設值
    },
  });

  // 1. 初始化 useFieldArray
  const { fields, append, remove } = useFieldArray({
    control, // 必須傳入來自 useForm 的 control
    name: 'interests', // 對應 defaultValues 中的 key
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                View your key metrics and recent project activity. Track progress across all your
                active projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends and identify growth
                opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id}>
            {/* 2. 必須使用 item.id 作為 key */}
            <input
              {...register(`interests.${index}.name`)} // 3. 使用 index 進行註冊
            />
            <button type="button" onClick={() => remove(index)}>
              刪除
            </button>
          </div>
        ))}

        <button type="button" onClick={() => append({ name: '' })}>
          新增項目
        </button>

        <button type="submit">提交</button>
      </form>
    </>
  );
};
