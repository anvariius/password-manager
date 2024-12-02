import { Folder } from "../../types/types.ts";
import { VscCode, VscFolderOpened, VscHeartFilled } from "react-icons/vsc";

export default function FolderItem({
  folder,
  active,
}: {
  folder: Folder;
  active: boolean;
}) {
  const folderIcons = {
    VscCode: VscCode,
    VscFolderOpened: VscFolderOpened,
    VscHeartFilled: VscHeartFilled,
  };
  const IconComponent = folderIcons[folder.icon];
  return (
    <div
      className={`flex items-center mb-3 hover:text-primary-hover cursor-pointer transition ${active && "text-primary"}`}
    >
      <div>
        <IconComponent />
      </div>
      <div className="text-md font-medium ml-2">{folder.name}</div>
    </div>
  );
}
