import { Icons } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatters } from '@/utils/formatters';

export const AdminTable = ({ headerContent, productsContent, openModal, deleteProduct }) => {
  const handleCapacityState = (costCapacity) => {
    let textColor = '';
    let textIcon = '';
    if (costCapacity < 1) {
      textColor = 'text-on-surface';
      textIcon = '‼️';
    } else if (1 < costCapacity && costCapacity < 5) {
      textColor = 'text-on-surface';
      textIcon = '⚠️';
    }
    return <TableCell className={textColor}>{`${textIcon} ${costCapacity} 份`}</TableCell>;
  };
  const renderContent = (contentItem) => {
    if (!Array.isArray(contentItem)) return '無';

    return contentItem.map((item) => formatters('content', item)).join(' / ');
  };

  return (
    <Table>
      {/* table header */}
      <TableHeader>
        <TableRow>
          {headerContent.map((item) => (
            <TableHead key={item.text} data-value={item.value}>
              {item.text}
            </TableHead>
          ))}
          <TableHead className="pr-6"></TableHead>
        </TableRow>
      </TableHeader>

      {/* table body */}
      <TableBody>
        {productsContent()?.map((item) => (
          <TableRow key={item.id}>
            {/* 產品圖片 */}
            <TableCell className="font-medium">
              <div className="flex justify-center items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="size-12 rounded-sm object-cover hover:scale-110 transition-transform cursor-zoom-in"
                />
              </div>
            </TableCell>

            {/* 產品標題 */}
            <TableCell className="font-medium">{item.title}</TableCell>

            {/* 產品類別 */}
            <TableCell>
              <Badge variant="outline">{formatters('type', item.type)}</Badge>
            </TableCell>

            {/* 上架售價 */}
            <TableCell>$ {item.price}</TableCell>

            {/* 成本價 */}
            {item.costPrice ? <TableCell>$ {item.costPrice}</TableCell> : null}

            {/* 上架份量 */}
            <TableCell>{item.capacity} g</TableCell>

            {/* 內容物 */}
            {item.category === 'fixedPokes' ? (
              <TableCell className="flex justify-center">
                <div className="text-left leading-5.5 text-sm">
                  基底：{renderContent(item.content.base)}
                  <br />
                  蛋白：{renderContent(item.content.protein)}
                  <br /> 配菜：{renderContent(item.content.side)} <br />
                  醬料：{renderContent(item.content.sauce)} <br />
                  撒料：{renderContent(item.content.topping)}
                </div>
              </TableCell>
            ) : item.category === 'otherProducts' ? (
              <TableCell className="flex justify-center h-full">
                <div className="text-left leading-5.5 text-sm items-center whitespace-break-spaces">
                  {item.content?.map((item) => item).join('\n')}
                </div>
              </TableCell>
            ) : null}

            {/* 庫存量 */}
            {handleCapacityState(item.stockQuantity)}

            {/* 上架狀態 */}
            <TableCell>
              <Badge variant={item.isEnabled ? 'success' : 'default'}>
                {item.isEnabled ? <Icons.success /> : <Icons.error />}
                {item.isEnabled ? '上架中' : '已下架'}
              </Badge>
            </TableCell>

            {/* 操作按鈕  */}
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="size-11"
                onClick={() => {
                  openModal('edit', item);
                }}
              >
                <Icons.edit />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-11"
                onClick={() => deleteProduct(item.id)}
              >
                <Icons.delete />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
