export default function Button({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const baseStyles =
    "px-6 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-lg";

  const variants = {
    primary: "bg-(--primary) text-white hover:bg-(--hover) hover:bg-opacity-80",
    secondary: "bg-white text-[#2E4442] border-2 border-[#2E4442] hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
