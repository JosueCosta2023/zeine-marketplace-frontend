import {
  FiCamera,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import Input from "../../../components/Input";
import { useRef, useState } from "react";
import Button from "../../../components/Button";
import PasswordValidate from "../../../components/PasswordValidate";
import { createdUser } from "../../../services/userService";
import { useNavigate } from "react-router-dom";

const RegistrationUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [passwd, setPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const senhaValida =
    passwd.length >= 8 &&
    /[@#$%^&*()":{}|<>]/.test(passwd) &&
    /\d/.test(passwd) &&
    passwd === confirmPasswd;

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!senhaValida) {
      setError("A senha não atende aos critérios.");
      return;
    }

    if (!name || !phone || !email || !passwd || !confirmPasswd) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!image) {
      setError("Selecione uma imagem de perfil.");
      return;
    }

    // Montar objeto para envio
    const userData = {
      name,
      phone,
      email,
      password: passwd,
      photo: image,
    };

    try {
      await createdUser(userData);
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      // Limpar campos se quiser
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar usuário.");
    }
  };

  const handleImagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmitRegister} className="mb-[80px] mt-[40px]">
      {/* Perfil */}
      <section className="mb-12">
        <h3 className="text-lg font-semibold mb-5">Perfil</h3>
        {(error || success) && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] flex flex-col items-center">
              <span
                className={`mb-4 text-2xl ${
                  error ? "text-red-500" : "text-green-600"
                }`}
              >
                {error ? "Erro" : "Sucesso"}
              </span>
              <p className="mb-6 text-center">{error || success}</p>
              {error && (
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                  }}
                >
                  Fechar
                </button>
              )}
            </div>
          </div>
        )}

        {/* Input de imagem do perfil */}
        <div className="flex flex-col items-start mb-6">
          <div
            className="w-[120px] h-[120px] rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden bg-primartLight text-primary relative"
            onClick={() => fileInputRef.current?.click()}
            tabIndex={0}
            aria-label="Selecionar imagem de perfil"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Imagem de perfil"
                  className="w-full h-hull object-cover"
                />
                <span className="absolute bottom-[-2px] right-[-2px] bg-white rounded-full p-1 shadow">
                  <FiCheck className="text-green-600 text-xl" />
                </span>
              </>
            ) : (
              <FiCamera />
            )}

            <input
              type="file"
              accept="image/"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImagechange}
            />
          </div>
        </div>

        <Input
          label="Nome Completo"
          type="text"
          placeholder="Digite seu nome completo"
          icon={<FiUser />}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Telefone"
          type="tel"
          placeholder="(00) 0 0000 - 0000"
          icon={<FiPhone />}
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </section>
      {/* Acesso */}
      <section className="mb-[40px]">
        <h3 className="text-lg font-semibold mb-5">Acesso</h3>
        <Input
          label="E-Mail"
          type="email"
          placeholder="Seu e-mail de acesso"
          icon={<FiMail />}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-4">
          <Input
            label="Senha"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Crie sua senha de acesso"
            icon={<FiLock />}
            required
            autoComplete="new-password"
          />

          <button
            type="button"
            className="absolute right-3 top-10 text-gray-400"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="relative mb-4">
          <Input
            label="Confirmar Senha"
            value={confirmPasswd}
            onChange={(e) => setConfirmPasswd(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confime sua senha de acesso"
            icon={<FiLock />}
            required
            autoComplete="new-password"
          />

          <button
            type="button"
            className="absolute right-3 top-10 text-gray-400"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={0}
            aria-label={showConfirmPassword ? "Ocultar senha" : "Exibir senha"}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <PasswordValidate password={passwd} confirmPassword={confirmPasswd} />
      </section>

      <Button type="submit">
        Cadastrar{" "}
        <span className="ml-2">
          <FiUser />
        </span>
      </Button>
    </form>
  );
};

export default RegistrationUserForm;
