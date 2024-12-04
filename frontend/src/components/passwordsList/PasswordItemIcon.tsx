import { IconType } from "react-icons";

export default function PasswordItemIcon({
  Icon,
  active,
}: {
  Icon: IconType;
  active?: boolean;
}) {
  return (
    <div
      className={`transition text-xl hover:text-primary ${active && "text-primary"}`}
    >
      <Icon />
    </div>
  );
}
