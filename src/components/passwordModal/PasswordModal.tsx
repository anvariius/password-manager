import { VscClose } from "react-icons/vsc";
import { useAppSelector } from "../../store/store.ts";
import {
  ModalStatus,
  passwordsSlice,
} from "../../store/slices/passwords.slice.ts";
import PasswordField from "./PasswordField.tsx";
import DefaultButton from "../ui/buttons/DefaultButton.tsx";
import { Password } from "../../types/types.ts";
import PasswordVariants from "./PasswordVariants.tsx";
import usePasswordModal from "../../hooks/usePasswordModal.ts";
import { isPasswordExpired } from "../../utils/utils.ts";
import NoticeTag from "../ui/buttons/NoticeTag.tsx";

export default function PasswordModal() {
  const modalStatus = useAppSelector(passwordsSlice.selectors.modalStatus);
  const password: Password = useAppSelector(
    passwordsSlice.selectors.activePassword,
  );
  const userFolders = useAppSelector(passwordsSlice.selectors.userFolders);

  const { fields, savePassword, changeField, closeModal, passwordVariants } =
    usePasswordModal({ password, userFolders });

  return (
    <>
      {modalStatus !== ModalStatus.Disabled && password && (
        <div className="py-4 absolute w-full min-h-full top-0 bottom-0 right-0 left-0 bg-dialog">
          <div className="dialog-content mx-auto mt-20 rounded h-auto w-1/3 bg-light">
            <div className="px-7 py-6 border-b-2 border-gray flex justify-between items-center">
              <div className="font-medium text-xl">
                {modalStatus === ModalStatus.NewPassword
                  ? "Добавить пароль"
                  : "Изменить пароль"}
              </div>
              <div className="text-4xl text-gray-hover hover:text-gray transition inline-flex justify-center items-center cursor-pointer">
                <VscClose onClick={() => closeModal()} />
              </div>
            </div>
            <div className="p-7 flex flex-col gap-y-4">
              {isPasswordExpired(password.lastChange) && (
                <div className="">
                  <NoticeTag size="lg">
                    Пароль устарел, необходимо обновить
                  </NoticeTag>
                </div>
              )}
              {fields.map((field, key) => (
                <div key={field.name}>
                  <PasswordField
                    {...field}
                    value={
                      password[field.name] === null ? "" : password[field.name]
                    }
                    change={(value: string) => changeField(key, value)}
                  />
                </div>
              ))}
              {password.password === "" && (
                <PasswordVariants
                  passwords={passwordVariants}
                  selectPassword={(password) => changeField(3, password)}
                />
              )}
              <div className="flex justify-between mt-5">
                <DefaultButton type="outline" click={() => closeModal()}>
                  Закрыть
                </DefaultButton>
                <DefaultButton click={() => savePassword()}>
                  Сохранить
                </DefaultButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
