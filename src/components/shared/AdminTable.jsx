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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AdminTable = ({ headerContent, productsContent, formatters, openModal }) => {
  const handleCapacityState = (costCapacity) => {
    let textColor = '';
    let textIcon = '';
    if (costCapacity < 1) {
      textColor = 'text-error';
      textIcon = '‼️';
    } else if (1 < costCapacity && costCapacity < 5) {
      textColor = 'text-on-secondary-container';
      textIcon = '⚠️';
    }
    return <TableCell className={textColor}>{`${textIcon} ${costCapacity} 份`}</TableCell>;
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
        {productsContent?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <div className="flex justify-center items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="bg-primary size-12 rounded-sm border border-outline-light object-cover hover:scale-110 transition-transform cursor-zoom-in"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{formatters(item.type)}</Badge>
            </TableCell>
            <TableCell>{`$ ${item.price}`}</TableCell>
            <TableCell>{`${item.capacity} g`}</TableCell>
            <TableCell>{`$ ${item.cost_price}`}</TableCell>
            {handleCapacityState(item.cost_capacity)}
            {item.content ? (
              <TableCell className="flex justify-center">
                <div className="text-left">
                  基底：糙米 <br />
                  蛋白：雞胸 / 鮪魚 / 蝦仁
                  <br /> 配菜：毛豆 / 杏鮑菇 / 彩椒 / 番茄 <br />
                  醬料：蜂蜜芥末 <br />
                  撒料：堅果酥
                </div>
              </TableCell>
            ) : null}
            <TableCell>
              <Badge variant={item.is_enabled ? 'success' : 'default'}>
                {item.is_enabled ? <Icons.success /> : <Icons.error />}
                {item.is_enabled ? '已上架' : '已下架'}
              </Badge>
            </TableCell>

            {/* operate */}
            <TableCell className="pr-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-11">
                    <Icons.more />
                    <span className="sr-only">操作</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={openModal}>
                    <Icons.look />
                    查看
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icons.edit />
                    編輯
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icons.delete />
                    刪除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
