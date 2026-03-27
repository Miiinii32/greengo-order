import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const OneGroupSelects = ({ content }) => {
  return (
    <Select>
      <SelectTrigger className="w-full min-w-40">
        <SelectValue placeholder={content.placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
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
