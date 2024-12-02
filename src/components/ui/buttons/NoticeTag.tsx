import { ReactNode } from "react";

export default function NoticeTag({
  children,
  size = "md",
}: {
  children: ReactNode;
  size?: "md" | "lg";
}) {
  const styles = {
    md: "py-0.5 px-2 text-xs",
    lg: "text-sm py-1 px-4",
  };
  return (
    <div
      className={`flex justify-center rounded bg-danger text-light ${styles[size]}`}
    >
      {children}
    </div>
  );
}
