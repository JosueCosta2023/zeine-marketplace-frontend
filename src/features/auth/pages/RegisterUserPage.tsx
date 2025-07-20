import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { FiArrowRight } from "react-icons/fi";
import RegistrationForm from "../components/RegistrationForm";
import Button from "../components/Button";


const RegisterUserPage = () => {
  return (
    
      <AuthLayout rightClassName="items-center flex flex-col">
        <div className="w-[403px]  mt-[72px] text-grayScale ">
          <h2 className="text-2xl font-bold mb-2">Crie sua conta</h2>
          <p className="">Informe os seus dados pessoais e de acesso</p>
        </div>
        <div className="w-[403px] max-h-[90vh]  overflow-y-auto scrollbar-hide">
          <RegistrationForm/>

          <div className="mt-8 text-left flex flex-col mb-[96px]">
            <span className="text-grayScale mb-2">Já tem uma conta?</span>

            <Button type="button" >
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
