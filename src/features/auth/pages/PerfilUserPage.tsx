import React, { useRef, useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FiImage, FiCheck } from "react-icons/fi";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { updateUser } from "../../../services/userService"; // ✅ Você precisará criar este service
import DelayedLoading from "../../../components/DelayedLoading";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  photo: string;
  password?: string;
}

const PerfilUserPage = () => {
  const { user, updateUserData } = useAuth(); // ✅ Assumindo que você tem updateUserData no contexto
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
  });

  // ✅ Inicializar dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || "",
        password: "", // Não mostrar senha atual
      });
      setPhoto(user.photo || null);
    }
  }, [user]);

  // ✅ Função para lidar com mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // Validar tamanho do arquivo
      if (file.size > 500 * 1024) {
        setError("A imagem deve ter no máximo 500kb");
        return;
      }

      reader.onload = (ev) => {
        const img = new window.Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const webDataUrl = canvas.toDataURL("image/webp", 0.8);
            setPhoto(webDataUrl);
            setFormData((prev) => ({ ...prev, photo: webDataUrl }));
          }
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // PerfilUserPage.tsx
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.email || !formData.phone) {
        setError("Nome, email e telefone são obrigatórios");
        return;
      }

      if (!user?.id) {
        setError("Erro: ID do usuário não encontrado");
        return;
      }

      // ✅ Dados para enviar
      const dataToUpdate = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        ...(photo && { photo }),
        ...(formData.password && { password: formData.password.trim() }),
      };

      // ✅ Enviar para backend
      await updateUser(user.id, dataToUpdate);

      // ✅ Atualizar localStorage diretamente
      const updatedUser = { ...user, ...dataToUpdate };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ Atualizar contexto
      if (updateUserData) {
        updateUserData(updatedUser);
      }

      // ✅ Atualizar interface
      setFormData((prev) => ({ ...prev, ...dataToUpdate, password: "" }));
      setIsEditing(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Função para cancelar edição
  const handleCancel = () => {
    // Restaurar dados originais
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || "",
        password: "",
      });
      setPhoto(user.photo || null);
    }
    setIsEditing(false);
    setError(null);
  };

  // ✅ Função para voltar aos produtos
  const handleHome = () => {
    navigate("/products");
  };

  // ✅ Função para alternar modo de edição
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError(null);
  };

  if (loading) {
    return (
      <DelayedLoading loading={loading} minShow={1000} delay={300}>
        <div className="text-primary text-loading">Atualizando perfil...</div>
      </DelayedLoading>
    );
  }

  return (
    <div className="w-full justify-center flex gap-6 mt-10 relative">
      {/* ✅ Mensagem de sucesso */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <FiCheck size={18} />
          Perfil atualizado com sucesso!
        </div>
      )}

      <form onSubmit={handleSave} className="w-full justify-center flex gap-6">
        {/* Left side - Foto */}
        <div
          className={`w-[415px] h-[340px] rounded-[10px] bg-gray-100 flex items-center justify-center overflow-hidden bg-primartLight text-primary relative ${
            isEditing ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={() => isEditing && fileInputRef.current?.click()}
          tabIndex={isEditing ? 0 : -1}
          aria-label={
            isEditing ? "Clique para alterar a imagem" : "Imagem do usuário"
          }
        >
          {photo ? (
            <>
              <img
                src={photo}
                alt="Imagem do usuário"
                className="w-full h-full rounded-[20px] p-1 shadow object-cover"
              />
              {isEditing && (
                <span className="absolute bottom-3 bg-white/80 rounded-full p-2">
                  <BiEditAlt size={22} />
                </span>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FiImage size={36} />
              <span>
                {isEditing ? "Clique para adicionar uma imagem" : "Sem imagem"}
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={!isEditing}
          />
        </div>

        {/* Right side - Dados */}
        <div className="bg-white rounded-[20px] p-[32px] w-[591px]">
          <div className="flex justify-between items-center">
            <h3 className="mb-6 font-bold text-grayScale/70">Meus Dados</h3>
          </div>

          <div className="flex gap-7 flex-col">
            {/* Primeira linha - Nome e Email */}
            <div className="w-full flex gap-4">
              <div className="w-full bg-transparent py-3 px-2 outline-none">
                <Input
                  label="Nome Completo"
                  required
                  style={{outline: "none"}}
                  readOnly={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="w-full bg-transparent py-3 px-2 outline-none">
                <Input
                  label="Email"
                  type="email"
                  style={{color: "gray", outline: "none"}}
                  readOnly={true}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </div>

            {/* Segunda linha - Telefone e Senha */}
            <div className="w-full flex gap-4">
              <div className="w-full bg-transparent py-3 px-2 outline-none">
                <Input
                  label="Telefone"
                  type="tel"
                  required
                  style={{outline: "none"}}
                  readOnly={!isEditing}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div className="w-full bg-transparent py-3 px-2 outline-none">
                <Input
                  label="Nova Senha (opcional)"
                  type="password"
                  readOnly={!isEditing}
                  value={formData.password}
                  style={{outline: "none"}}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder={isEditing ? "Digite uma nova senha" : "••••••••"}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="text-red-500 mt-4 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          {/* Botões */}
          <div className="w-full flex gap-3 mt-[40px]">
            <Button
              type="button"
              className="h-[48px]"
              onClick={handleHome}
              variant="secondary"
            >
              <span className="flex w-full justify-center">
                Voltar aos Produtos
              </span>
            </Button>

            {isEditing ? (
              <>
                <Button
                  type="button"
                  className="h-[48px] bg-gray-500 hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  <MdCancel size={18} />
                  <span className="flex w-full justify-center">Cancelar</span>
                </Button>

                <Button type="submit" className="h-[48px]" disabled={loading}>
                  <MdSave size={18} />
                  <span className="flex w-full justify-center">
                    {loading ? "Salvando..." : "Salvar Alterações"}
                  </span>
                </Button>
              </>
            ) : (
              <Button type="button" className="h-[48px]" onClick={toggleEdit}>
                <MdEdit size={18} />
                <span className="flex w-full justify-center">
                  Editar Perfil
                </span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PerfilUserPage;
