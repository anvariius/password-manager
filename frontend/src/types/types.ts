export type Id = number | string | null;

export enum PasswordStatus {
  "REMOVED" = "REMOVED",
  "ACTIVE" = "ACTIVE",
  "EXPIRED" = "EXPIRED",
}

export type FolderId = Id;

export type Folder = {
  id: Id;
  name: string;
  icon: FolderIcons;
};

export type FolderIcons = "VscFolderOpened" | "VscHeartFilled" | "VscCode";

export type Password = {
  id: Id;
  userId: Id;
  folderId: Id;
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
