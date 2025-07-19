import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import { FaRegUser } from "react-icons/fa";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="w-[403px] p-[10px] py-20">
        <h2 className="text-2xl font-bold mb-2 text-dark">Acesse sua conta</h2>
        <p className="text-grayScale mb-12">
          Informe seu Email e senha para entrar
        </p>
        <LoginForm />
        <div className="mt-[131px] text-left flex flex-col">
          <span className="text-grayScale mb-2">Ainda não tem uma conta?</span>
          <Link
            to="/register"
            className="flex justify-between items-center gap-3 text-primary border border-primary rounded-[10px] h-[56px] px-4 py-2 hover:bg-primary hover:text-white font-bold transition"
          >
            Cadastrar <FaRegUser />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
