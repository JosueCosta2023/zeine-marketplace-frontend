import { useState } from "react";
import Input from "../../../components/Input";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password)
      navigate("/admin")
      
    } catch (error) {
      setError("E-mail ou senha invalidos")
    }
  };


  return (
    <form action="" onSubmit={handleSubmitLogin}>
      <Input
        label="E-Mail"
        type="email"
        placeholder="Seu e-mail cadastrado"
        icon={<FiMail />}
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <div className="relative mb-12">
        <Input
          label="Senha"
          type={showPassword ? "text" : "password"}
          placeholder="Informe sua senha"
          icon={<FiLock />}
          required
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-12 text-gray-400"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">
        Acessar{" "}
        <span className="ml-2">
          {" "}
          <FiArrowRight />{" "}
        </span>
      </Button>
    </form>
  );
};

export default LoginForm;
