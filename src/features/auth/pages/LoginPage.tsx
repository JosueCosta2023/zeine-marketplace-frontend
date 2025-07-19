import { FaRegUser } from "react-icons/fa";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <main className="min-h-screen p-5 flex items-center justify-center bg-accent">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden min-h-[500px]">
        {/* lado esquerdo */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-accent p-8">
          <img src="/logo.png" alt="Logo" className="mb-8 w-32" />
        </div>

        {/* Lado direito */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Acesse sua conta</h2>
          <p className="text-gray mb-6">
            Informe seu Email e senha para entrar
          </p>
          <LoginForm />
          <div className="mt-6 text-left flex flex-col">
            <span className="text-gray  mb-2">Ainda nao tem uma conta?</span>
            <Link 
            to="/register"
            className="flex justify-center items-center gap-3 text-primary border border-primary rounded px-4 py-2 hover:bg-primary hover:text-white font-bold transition">
              Cadastrar <FaRegUser />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
