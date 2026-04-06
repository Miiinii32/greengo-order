import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Icons } from './Icons';

export const OneGroupSelects = ({ id, content, ...props }) => {
  const isInvalid = props['aria-invalid'];

  return (
    <Select {...props} key={props.value || ''}>
      <SelectTrigger className="w-full min-w-40" aria-invalid={isInvalid} id={id}>
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
