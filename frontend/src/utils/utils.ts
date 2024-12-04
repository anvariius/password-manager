export const copyToClipboard = async (text: string | number | null) => {
  if (text === null) return;
  try {
    await navigator.clipboard.writeText(text.toString());
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const generatedPasswords = (lengths: number[]) =>
  lengths.map((pLength) => generatePassword(pLength));

export const generatePassword = (passwordLength: number) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

export const isPasswordExpired = (date: string) => {
  const passwordDate = new Date(date);
  const today = new Date();
  return today.getTime() - passwordDate.getTime() > 1000 * 60 * 60 * 24 * 30;
};
