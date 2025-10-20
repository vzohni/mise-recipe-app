export default function Button({ 
  children, 
  variant = "primary",
  onClick 
}: { 
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all cursor-pointer";
  
  const variants = {
    primary: "bg-[#2E4442] text-white hover:bg-opacity-90",
    secondary: "bg-white text-[#2E4442] border-2 border-[#2E4442] hover:bg-[#2E4442] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}