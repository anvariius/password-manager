import { FieldStatus } from "../../../types/types.ts";

export default function DefaultInput({
  value,
  change,
  placeholder,
  type = "text",
  status = FieldStatus.SUCCESS,
}: {
  value: string | number | null;
  change: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  status?: FieldStatus;
}) {
  if (value === null) value = "";

  const getInputStyles = (status: FieldStatus) => {
    switch (status) {
      case FieldStatus.ERROR:
        return "border-danger focus:ring-danger placeholder:text-danger";
      case FieldStatus.WARNING:
        return "border-warning focus:ring-warning placeholder:text-warning";
      default:
        return "border-gray focus:border-primary focus:ring-primary placeholder:text-gray-hover";
    }
  };
  const inputStyles = getInputStyles(status);

  return (
    <input
      type={type}
      autoComplete="on"
      placeholder={placeholder}
      className={`border-2 hover:rounded-l h-10 w-full px-4 text-base font-medium transition focus:outline-0 ${inputStyles}`}
      value={value}
      onChange={(e) => change(e.target.value)}
    />
  );
}
