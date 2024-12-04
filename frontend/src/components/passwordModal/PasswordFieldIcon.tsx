import { IconType } from "react-icons";

export default function PasswordFieldIcon({ Icon }: { Icon: IconType }) {
  return (
    <div className="border-2 border-gray text-xl text-gray py-2 px-3 h-10 cursor-pointer transition hover:border-primary hover:text-primary">
      <Icon />
    </div>
  );
}
