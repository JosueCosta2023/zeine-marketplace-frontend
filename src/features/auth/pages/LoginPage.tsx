import { FaRegUser } from "react-icons/fa";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-accent">
      <div className="flex w-full max-w-screen  shadow-lg overflow-hidden min-h-screen">
        {/* lado esquerdo */}
        <div className="hidden md:flex flex-col w-[60%] bg-accent p-8 items-center">
          {/* logo */}
          <div className="w-full">
            <div className="flex items-center gap-4">
            <img src={ArchiveImport.archives.images.logo} alt="Logo" className="w-32" />
            <div className="h-full flex flex-col justify-center">
              <p className="text-dark font-semibold font text-2xl">Marketplace</p>
              <span className="text-base">Painel de Vendedor</span>
            </div>
            </div>
          </div>

          {/* background */}
          <div className="flex justify-center w-full h-full items-cente">
            <img src={ArchiveImport.archives.images.background} alt="" />
          </div>
        </div>

        {/* Lado direito */}
        <div className="flex-1 p-8 flex justify-center">
          <div className="w-[563px] p-[80px]">

          <h2 className="text-2xl font-extrabold mb-2 text-dark ">Acesse sua conta</h2>
          <p className="text-gray mb-12">
            Informe seu Email e senha para entrar
          </p>
          <LoginForm />
          <div className="mt-[131px] text-left flex flex-col">
            <span className="text-gray  mb-2">Ainda nao tem uma conta?</span>
            <Link 
            to="/register"
            className="flex justify-between items-center gap-3 text-primary border border-primary rounded h-[56px] px-4 py-2 hover:bg-primary hover:text-white font-bold transition">
              Cadastrar <FaRegUser />
            </Link>
          </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
