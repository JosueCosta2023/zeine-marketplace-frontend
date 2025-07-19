import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FiArrowRight } from "react-icons/fi";
import RegistrationForm from "../components/RegistrationForm";
import Button from "../components/Button";


const RegisterUserPage = () => {
  return (
    
      <AuthLayout rightClassName="items-start">
        <div className="w-[503px] max-h-[90vh] p-8 mt-[72px] overflow-y-auto scrollbar-hide">
          <h2 className="text-2xl font-bold mb-2 text-dark">Crie sua conta</h2>
          <p className="mb-10">Informe os seus dados pessoais e de acesso</p>
          <RegistrationForm/>

          <div className="mt-8 text-left flex flex-col">
            <span className="text-grayScale mb-2">Já tem uma conta?</span>

            <Button type="button">
              <Link
                to="/login"
                className="flex items-center justify-between w-full"
              >
                Acessar <FiArrowRight/>
              </Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
  )
};

export default RegisterUserPage;
