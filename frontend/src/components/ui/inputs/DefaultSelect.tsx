import { SelectOption } from "../../../types/types.ts";

export default function DefaultSelect({
  value,
  options,
  change,
}: {
  value: string | number | null;
  options: SelectOption[];
  change: (value: string) => void;
}) {
  if (value === null) value = "";
  return (
    <select
      className="border-2 border-gray rounded h-10 w-full px-4 text-base font-medium transition focus:outline-0"
      onChange={(e) => change(e.target.value)}
      value={value}
    >
      {value === "" && <option value="">Не выбрано</option>}
      {options.map(
        (option) =>
          option.value !== null && (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ),
      )}
    </select>
  );
}
