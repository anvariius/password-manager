export default function DefaultButton({
  children,
  type = "primary",
  fullWidth = false,
  click,
}: {
  children: String;
  type?: "primary" | "outline";
  fullWidth?: boolean;
  click?: () => void;
}) {
  const buttonStyle = {
    primary: "text-light bg-primary hover:bg-primary-hover",
    outline: "text-primary bg-light hover:bg-primary-hover hover:text-light",
  };
  return (
    <button
      onClick={click}
      className={`px-3 py-1.5 text-sm border border-primary font-medium rounded transition ${buttonStyle[type]} ${fullWidth && "w-full"}`}
    >
      {children}
    </button>
  );
}
