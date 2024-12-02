import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Folder,
  FolderId,
  Id,
  Password,
  PasswordStatus,
} from "../../types/types.ts";

type initialState = {
  passwords: Password[];
  folders: Folder[];
  activeFolderId: Id | null;
  activePasswordIndex: number | null;
  modalStatus: ModalStatus;
  activePassword: Password;
};

export enum ModalStatus {
  Disabled,
  NewPassword,
  EditPassword,
}

const newPassword: Password = {
  id: "new",
  folderId: null,
  service: "",
  login: "",
  password: "",
  favorite: false,
  lastChange: new Date().toISOString(),
  status: PasswordStatus.ACTIVE,
};

const initialState: initialState = {
  passwords: [
    {
      id: 1,
      folderId: null,
      service: "vk",
      login: "vk",
      password: "password",
      favorite: false,
      lastChange: "2024-10-23T00:00:00.000Z",
      status: PasswordStatus.ACTIVE,
    },
  ],
  folders: [
    { id: "all", name: "Все пароли", icon: "VscFolderOpened" },
    { id: "favorite", name: "Избранные", icon: "VscHeartFilled" },
    { id: 0, name: "Рабочие", icon: "VscCode" },
    { id: 1, name: "Личные", icon: "VscCode" },
  ],
  activeFolderId: "all",
  activePasswordIndex: null,
  activePassword: { ...newPassword },
  modalStatus: ModalStatus.Disabled,
};

export const passwordsSlice = createSlice({
  name: "passwords",
  initialState,
  selectors: {
    activeFolderId: (state) => state.activeFolderId,
    folders: (state) => state.folders,
    userFolders: createSelector(
      (state) => state.folders,
      (folders: Folder[]) =>
        folders.filter((folder) => typeof folder.id === "number"),
    ),
    currentPasswords: createSelector(
      (state) => state.activeFolderId,
      (state) => state.passwords,
      (activeFolderId: FolderId, passwords: Password[]) => {
        switch (activeFolderId) {
          case "all":
            return passwords;
          case "favorite":
            return passwords.filter((p) => p.favorite);
          default:
            return passwords.filter((p) => p.folderId == activeFolderId);
        }
      },
    ),
    activePasswordIndex: (state) => state.activePasswordIndex,
    activePassword: (state) => state.activePassword,
    modalStatus: (state) => state.modalStatus,
  },
  reducers: {
    toggleFavorite: (state, action: PayloadAction<{ passwordId: Id }>) => {
      const { passwordId } = action.payload;
      const passwordIndex = state.passwords.findIndex(
        (p) => p.id === passwordId,
      );
      if (passwordIndex !== -1)
        state.passwords[passwordIndex].favorite =
          !state.passwords[passwordIndex].favorite;
    },
    removePassword: (state, action: PayloadAction<{ passwordId: Id }>) => {
      const { passwordId } = action.payload;
      state.passwords = state.passwords.filter((p) => p.id !== passwordId);
    },
    setActiveFolderId: (state, action: PayloadAction<{ folderId: Id }>) => {
      const { folderId } = action.payload;
      state.activeFolderId = folderId;
    },
    setModalStatus: (
      state,
      action: PayloadAction<{ modalStatus: ModalStatus; passwordId?: Id }>,
    ) => {
      const { modalStatus, passwordId } = action.payload;

      if (modalStatus === ModalStatus.EditPassword) {
        const passwordIndex = state.passwords.findIndex(
          (p) => p.id === passwordId,
        );
        if (passwordIndex !== -1) {
          state.activePasswordIndex = passwordIndex;
          state.activePassword = state.passwords[passwordIndex];
        }
      } else {
        state.activePasswordIndex = null;
        state.activePassword = { ...newPassword };
      }
      state.modalStatus = modalStatus;
    },
    changeActivePassword: (
      state,
      action: PayloadAction<{ field: keyof Password; value: string }>,
    ) => {
      const { field, value } = action.payload;
      // @ts-ignore
      state.activePassword[field] = value;
    },
    savePassword: (state) => {
      if (state.activePassword.id === "new") {
        state.activePassword.id =
          Number(state.passwords[state.passwords.length - 1].id) + 1;
        state.passwords.push(state.activePassword);
      } else if (state.activePasswordIndex !== null) {
        if (
          state.activePassword.password !==
          state.passwords[state.activePasswordIndex].password
        ) {
          state.activePassword.lastChange = new Date().toISOString();
        }
        state.passwords[state.activePasswordIndex] = {
          ...state.activePassword,
        };
      }
      state.activePasswordIndex = null;
      state.activePassword = { ...newPassword };
      state.modalStatus = ModalStatus.Disabled;
    },
  },
});
