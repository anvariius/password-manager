export type Id = number | string | null;

export enum PasswordStatus {
  "REMOVED",
  "ACTIVE",
  "EXPIRED",
}

export type FolderId = Id | "all" | "favorite";

export type Folder = {
  id: FolderId;
  name: string;
  icon: FolderIcons;
};

export type FolderIcons = "VscFolderOpened" | "VscHeartFilled" | "VscCode";

export type Password = {
  id: Id;
  folderId: FolderId;
  service: string;
  login: string;
  password: string;
  favorite: boolean;
  lastChange: string;
  status: PasswordStatus;
};

export type SelectOption = {
  value: string | number | null;
  name: string | number;
};

export type FieldType = "text" | "password" | "select";

export type FieldName = "service" | "login" | "password" | "folderId";
export enum FieldStatus {
  ERROR,
  SUCCESS,
  WARNING,
}
export type FormField = {
  type: FieldType;
  name: FieldName;
  isHidden?: boolean;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  required: boolean;
  status: FieldStatus;
};
