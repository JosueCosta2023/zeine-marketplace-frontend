import { BiCheck, BiX, BiSquareRounded, BiSquare, BiSolidSquare } from "react-icons/bi";

interface PasswdType {
  password: string;
  confirmPassword: string;
}

const PasswordValidate = ({ password, confirmPassword }: PasswdType) => {
  // Condicao de estilos
  const oitoCaracter = password.length >= 8;
  const caracterEspecial = /[@#$%^&*()":{}|<>]/.test(password);
  const contemNumeros = /\d/.test(password);
  const ContemLetraMaiusculaEMinuscula =
    /[a-z]/.test(password) && /[A-Z]/.test(password);
  const senhasIguais = password === confirmPassword;

  // Função para definir ícone e cor
  const getStatus = (valid: boolean) => {
    if (password.length === 0) {
      return { icon: <BiSolidSquare size={5} />, color: "text-black" };
    }
    return valid
      ? { icon: <BiCheck />, color: "text-green-500" }
      : { icon: <BiX />, color: "text-red-600" };
  };
  return (
    <div className="mt-5 mb-5">
      <h3 className="text-lg font-semibold mb-3">Criterios de senhas</h3>
      <ul>
        <li
          className={`flex items-center gap-2 ${getStatus(oitoCaracter).color}`}
        >
          {getStatus(oitoCaracter).icon} Conter mais de 8 caracteres
        </li>
        <li
          className={`flex items-center gap-2 ${
            getStatus(caracterEspecial).color
          }`}
        >
          {getStatus(caracterEspecial).icon} Conter caracteres especiais @#$%
        </li>
        <li
          className={`flex items-center gap-2 ${
            getStatus(contemNumeros).color
          }`}
        >
          {getStatus(contemNumeros).icon} Conter numeros
        </li>

        <li
          className={`flex items-center gap-2 ${
            getStatus(ContemLetraMaiusculaEMinuscula).color
          }`}
        >
          {getStatus(ContemLetraMaiusculaEMinuscula).icon} Conter letras
          maiúsculas e minúsculas
        </li>

        <li
          className={`flex items-center gap-2 ${getStatus(senhasIguais).color}`}
        >
          {getStatus(senhasIguais).icon} As senhas devem ser iguais
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidate;
