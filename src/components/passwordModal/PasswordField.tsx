import { FieldStatus, FieldType, SelectOption } from "../../types/types.ts";
import DefaultInput from "../ui/inputs/DefaultInput.tsx";
import DefaultSelect from "../ui/inputs/DefaultSelect.tsx";
import PasswordFieldIcon from "./PasswordFieldIcon.tsx";
import { VscCopy, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { copyToClipboard } from "../../utils/utils.ts";

export default function PasswordField({
  type,
  label,
  placeholder,
  value,
  options,
  change,
  status,
}: {
  type: FieldType;
  label: string;
  placeholder?: string;
  value: string | number | null;
  options?: SelectOption[];
  change: (value: string) => void;
  status?: FieldStatus;
}) {
  const [visibility, setVisibility] = useState<boolean>(type === "password");
  return (
    <div className="">
      <div className="text-sm font-semibold mb-1">{label}</div>
      <div className="flex rounded overflow-hidden">
        {type === "select" && options && (
          <DefaultSelect
            value={value}
            options={options}
            change={(value: string) => {
              change(value);
            }}
          />
        )}
        {type !== "select" && (
          <>
            <DefaultInput
              type={visibility ? "password" : "text"}
              value={value}
              placeholder={placeholder}
              change={(value: string) => {
                change(value);
              }}
              status={status}
            />
            {type === "password" && (
              <div onClick={() => setVisibility(!visibility)}>
                <PasswordFieldIcon Icon={visibility ? VscEye : VscEyeClosed} />
              </div>
            )}
            <div onClick={() => copyToClipboard(value)}>
              <PasswordFieldIcon Icon={VscCopy} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
