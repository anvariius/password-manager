import DefaultButton from "../ui/buttons/DefaultButton.tsx";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import {
  ModalStatus,
  passwordsSlice,
} from "../../store/slices/passwords.slice.ts";
import FolderItem from "./FolderItem.tsx";
import { Id } from "../../types/types.ts";

export default function Folders() {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(passwordsSlice.selectors.folders);
  const activeFolderId = useAppSelector(
    passwordsSlice.selectors.activeFolderId,
  );

  const setActiveFolderId = (folderId: Id) => {
    dispatch(passwordsSlice.actions.setActiveFolderId({ folderId }));
  };
  const addNewPassword = () => {
    dispatch(
      passwordsSlice.actions.setModalStatus({
        modalStatus: ModalStatus.NewPassword,
      }),
    );
  };
  return (
    <>
      <div className="text-lg font-bold">Папки</div>
      <div className="h-0.5 bg-primary my-3"></div>
      {folders.map((folder) => (
        <div key={folder.id} onClick={() => setActiveFolderId(folder.id)}>
          <FolderItem folder={folder} active={folder.id === activeFolderId} />
        </div>
      ))}
      <div className="h-px bg-gray my-3"></div>
      <DefaultButton fullWidth click={() => addNewPassword()}>
        Добавить пароль
      </DefaultButton>
    </>
  );
}
