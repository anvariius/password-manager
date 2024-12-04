import {
  ModalStatus,
  passwordsSlice,
} from "../store/slices/passwords.slice.ts";
import { FieldStatus, Folder, FormField, Password } from "../types/types.ts";
import { useAppDispatch } from "../store/store.ts";
import { useState } from "react";
import { generatedPasswords } from "../utils/utils.ts";

export default function usePasswordModal({
  password,
  userFolders,
}: {
  password: Password;
  userFolders: Folder[];
}) {
  const [fields, setFields] = useState<FormField[]>([
    {
      name: "folderId",
      type: "select",
      label: "Папка",
      options: userFolders.map((f) => ({
        name: f.name,
        value: f.id,
      })),
      required: false,
      status: FieldStatus.SUCCESS,
    },
    {
      name: "service",
      type: "text",
      label: "Сервис",
      placeholder: "Введите название сервиса",
      required: false,
      status: FieldStatus.SUCCESS,
    },
    {
      name: "login",
      type: "text",
      label: "Логин",
      placeholder: "Введите логин",
      required: true,
      status: FieldStatus.SUCCESS,
    },
    {
      name: "password",
      type: "password",
      label: "Пароль",
      placeholder: "Введите пароль",
      required: true,
      status: FieldStatus.SUCCESS,
    },
  ]);
  const [passwordVariants] = useState<string[]>(
    generatedPasswords([8, 8, 8, 10, 10, 12, 12]),
  );

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(
      passwordsSlice.actions.setModalStatus({
        modalStatus: ModalStatus.Disabled,
      }),
    );
  };

  const changeField = (fieldKey: number, value: string) => {
    const field = { ...fields[fieldKey] };
    field.required && value.trim() === ""
      ? (field.status = FieldStatus.ERROR)
      : (field.status = FieldStatus.SUCCESS);
    dispatch(
      passwordsSlice.actions.changeActivePassword({
        field: fields[fieldKey].name,
        value,
      }),
    );
    setFields([
      ...fields.slice(0, fieldKey),
      field,
      ...fields.slice(fieldKey + 1, fields.length),
    ]);
  };

  const savePassword = () => {
    for (let i = 0; i < fields.length; i++) {
      if (
        fields[i].required &&
        password[fields[i].name]?.toString().trim() === ""
      ) {
        setFields([
          ...fields.slice(0, i),
          { ...fields[i], status: FieldStatus.ERROR },
          ...fields.slice(i + 1, fields.length),
        ]);
        return;
      }
    }
    dispatch(passwordsSlice.actions.savePassword());
  };

  return { fields, savePassword, changeField, closeModal, passwordVariants };
}
