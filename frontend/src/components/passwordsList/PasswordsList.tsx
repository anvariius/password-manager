import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import {
  ModalStatus,
  passwordsSlice,
} from "../../store/slices/passwords.slice.ts";
import PasswordItem from "./PasswordItem.tsx";
import { Id } from "../../types/types.ts";

export default function PasswordsList() {
  const dispatch = useAppDispatch();

  const passwordsList = useAppSelector(
    passwordsSlice.selectors.currentPasswords,
  );
  const toggleFavorite = (passwordId: Id) => {
    dispatch(passwordsSlice.actions.toggleFavorite({ passwordId }));
  };
  const removePassword = (passwordId: Id) => {
    if (!confirm("Вы действительно хотите удалить пароль?")) return;
    dispatch(passwordsSlice.actions.removePassword({ passwordId }));
  };
  const changePassword = (passwordId: Id) => {
    dispatch(
      passwordsSlice.actions.setModalStatus({
        modalStatus: ModalStatus.EditPassword,
        passwordId: passwordId,
      }),
    );
  };
  return (
    <>
      <div className="text-xl font-bold">Все Пароли</div>
      <div className="h-0.5 bg-primary my-3"></div>
      {passwordsList.length ? (
        passwordsList.map((password) => (
          <div key={password.id} onClick={() => changePassword(password.id)}>
            <PasswordItem
              password={password}
              toggleFavorite={() => toggleFavorite(password.id)}
              removePassword={() => removePassword(password.id)}
            />
          </div>
        ))
      ) : (
        <div className="text-4xl font-black text-gray text-center my-10">
          Нет паролей
        </div>
      )}
    </>
  );
}
