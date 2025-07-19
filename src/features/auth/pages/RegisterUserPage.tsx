import { Link } from "react-router-dom";
import Button from "../components/Button";

const RegisterUserPage = () => {
  return (
    <>
      <h1>Novo Cadastro</h1>
      <Button asChildren >
        <Link to="/login" className="w-full">Voltar a tela de login</Link>
      </Button>
    </>
  );
};

export default RegisterUserPage;
