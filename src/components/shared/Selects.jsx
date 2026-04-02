import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const OneGroupSelects = ({ content, ...props }) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full min-w-40">
        <SelectValue placeholder={content.placeholder} />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          {content.options.map((item) => (
            <SelectItem value={item.value} key={item.text}>
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
