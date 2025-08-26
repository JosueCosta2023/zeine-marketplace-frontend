import { BiCheck, BiX } from "react-icons/bi";

interface PasswdType{
  password: string,
  confirmPassword: string
}

const PasswordValidate = ({password, confirmPassword}: PasswdType) => {
  const oitoCaracter = password.length >= 8;
  const caracterEspecial = /[@#$%^&*()":{}|<>]/.test(password);
  const contemNumeros = /\d/.test(password);
  const ContemLetraMaiusculaEMinuscula = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const senhasIguais =  password === confirmPassword;

  return (
    <div className="mt-5 mb-5">
      <h3 className="text-lg font-semibold mb-3">Criterios de senhas</h3>
      <ul>
        <li
          className={`flex items-center gap-2 ${
            oitoCaracter ? "text-green-500" : "text-red-600"
          }`}
        >
          {oitoCaracter ? <BiCheck /> : <BiX />} Conter mais de 8 caracteres{" "}
        </li>

        <li
          className={`flex items-center gap-2 ${
            caracterEspecial ? "text-green-500" : "text-red-600"
          }`}
        >
          {caracterEspecial ? <BiCheck /> : <BiX />} Conter caracteres especiais @#$%{" "}
        </li>

        <li
          className={`flex items-center gap-2 ${
            contemNumeros ? "text-green-500" : "text-red-600"
          }`}
        >
          {contemNumeros ? <BiCheck /> : <BiX />} Conter numeros{" "}
        </li>

        <li
          className={`flex items-center gap-2 ${
            ContemLetraMaiusculaEMinuscula ? "text-green-500" : "text-red-600"
          }`}
        >
          {ContemLetraMaiusculaEMinuscula ? <BiCheck /> : <BiX />}Conter Lentras maiusculas e minusculas{" "}
        </li>

        <li
          className={`flex items-center gap-2 ${
            senhasIguais ? "text-green-500" : "text-red-600"
          }`}
        >
          {senhasIguais ? <BiCheck /> : <BiX />}A senhas devem ser iguais{" "}
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidate;
