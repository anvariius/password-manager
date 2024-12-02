import { VscCopy, VscHeartFilled, VscTrash } from "react-icons/vsc";
import PasswordItemIcon from "./PasswordItemIcon.tsx";
import { Password } from "../../types/types.ts";
import { copyToClipboard, isPasswordExpired } from "../../utils/utils.ts";
import NoticeTag from "../ui/buttons/NoticeTag.tsx";

export default function PasswordItem({
  password,
  toggleFavorite,
  removePassword,
}: {
  password: Password;
  toggleFavorite: () => void;
  removePassword: () => void;
}) {
  return (
    <div className="p-3 flex justify-between items-center border-b border-gray hover:bg-gray transition duration-150 cursor-pointer">
      <div>
        <div className="text-md font-medium">{password.login}</div>
        <div className="text-xs">{password.service}</div>
      </div>
      <div className="flex text-lg gap-x-1">
        {isPasswordExpired(password.lastChange) && (
          <div className="mr-5">
            <NoticeTag>Устарел</NoticeTag>
          </div>
        )}
        <div
          onClick={async (e) => {
            e.stopPropagation();
            await copyToClipboard(password.password);
          }}
        >
          <PasswordItemIcon Icon={VscCopy} />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          <PasswordItemIcon Icon={VscHeartFilled} active={password.favorite} />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            removePassword();
          }}
        >
          <PasswordItemIcon Icon={VscTrash} />
        </div>
      </div>
    </div>
  );
}
