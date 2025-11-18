export default function Footer() {
  return (
    <footer className="bg-[#F2EBE3]">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
        <img src="/Mise_Logo_White.svg" alt="Mise Logo" className="h-10 md:h-12" />
        <span className="text-xs text-center md:text-base md:text-left">
          Mise LTD. Copyright 2025 ©. All Rights Reserved.
          <span className="block md:inline">
            {" "}Created by{" "}
            <a
              href="https://victorzohni.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              Victor Zohni
            </a>
          </span>
        </span>
      </div>
    </footer>
  );
}
