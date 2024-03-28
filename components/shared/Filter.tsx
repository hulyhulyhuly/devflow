import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  containerClasses?: string;
  innerClasses?: string;
}

const Filter = ({ filters, containerClasses, innerClasses }: Props) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${innerClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-4 py-2`}
        >
          <SelectValue
            className="line-clamp-1 flex-1 text-left"
            placeholder="Select a Filter"
          />
        </SelectTrigger>

        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          {filters.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
