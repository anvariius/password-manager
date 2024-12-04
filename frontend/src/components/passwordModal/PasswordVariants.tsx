export default function PasswordVariants({
  passwords,
  selectPassword,
}: {
  passwords: string[];
  selectPassword: (password: string) => void;
}) {
  return (
    <div className="flex flex-wrap">
      {passwords.map((password) => (
        <div
          className="text-primary text-base mr-2 mb-1 font-medium border-b border-primary cursor-pointer transition hover:border-light"
          key={password}
          onClick={() => selectPassword(password)}
        >
          {password}
        </div>
      ))}
    </div>
  );
}
