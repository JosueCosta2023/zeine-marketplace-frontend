import type { ReactNode } from "react";
import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";

interface AuthLayoutProps {
  children: ReactNode;
  rightClassName?: string;
}

const AuthLayout = ({ children, rightClassName }: AuthLayoutProps) => {
  return (
    <main className="min-h-sreen flex items-center justify-center bg-accent">
      <div className="flex w-full max-w-screen shadow-lg overflow-hidden min-h-screen">
        {/* Side left  */}
        <div className="hidden md:flex flex-col w-[55%] bg-accent p-8 items-center">
          <div className="w-full">
            <div className="flex items-center gap-4">
              <img
                src={ArchiveImport.archives.images.logo}
                alt="Logo"
                className="w-32"
              />

              <div className="h-full flex flex-col justify-center">
                <p className="text-dark font-bold font text-2xl">Marketplace</p>
                <span className="text-base">Painel de Vendedor</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <img
              src={ArchiveImport.archives.images.background}
              className="object-top"
              alt=""
            />
          </div>
        </div>

        {/* Side right */}
        <div
          className={`flex-1 flex px-[104px] justify-center ${rightClassName}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
