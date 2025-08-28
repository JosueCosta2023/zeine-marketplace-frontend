import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FiImage } from "react-icons/fi";
import type { ProductFormValues } from "../../../types/globalTypes";
import { getCategories } from "../../../services/categoryService";
import { BiEditAlt } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createdUser } from "../../../services/userService";

interface ProductFormProsp {
  initialValues?: ProductFormValues;
  readOnlys?: boolean;
  onSubmit?: (values: ProductFormValues) => void;
  userId?: string;
  currentStatus?: string;
}

interface Category {
  id: string;
  name: string;
}

const RegistrationProductForm: React.FC<ProductFormProsp> = ({
  initialValues = {
    title: "",
    price: 0,
    description: "",
    photo: "",
    categoryId: "",
    status: "",
    userId: "",
  },
  readOnlys = false,
  onSubmit,
  currentStatus,
}) => {
  const [values, setValues] = React.useState<ProductFormValues>(initialValues);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUserId = user?.id;

    console.log("Produtos do formulario front", values);

    if (onSubmit)
      onSubmit({
        ...values,
        photo: photo || "",
        status: values.status || "ANUNCIADO",
        userId: currentUserId || "",
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (file.size > 500 * 1024) {
        setError("A imagem deve ter no maximo 500kb");
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
          }
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    if (
      !values.title ||
      !values.description ||
      !values.price ||
      !values.categoryId ||
      !photo
    ) {
      setError("Campos com o sinal * são obrigatórios.");
      return false;
    }

    setError(null);
    return true;
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (currentStatus) {
      setValues((prev) => ({ ...prev, status: currentStatus }));
    }
  }, [currentStatus]);

  useEffect(() => {
    setPhoto(initialValues.photo || null);
    setValues(initialValues);
  }, [initialValues?.id]);

  const handleHome = () => {
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full justify-center  flex gap-6">
      {/* Left side */}
      <div
        className="w-[415px] h-[340px] rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden bg-primartLight text-primary relative"
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        aria-label="Selecione a imagem do produto"
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt="Imagem de produto"
              className="w-full h-full rounded-[20px] p-1 shadow object-cover"
            />
            <span className="absolute bottom-3">
              <BiEditAlt size={22} />
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FiImage size={36} />
            <span>Selecione a imagem do produto</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      

      {/* right side */}
      <div className="bg-white rounded-[20px] p-[32px] w-[591px] ">
        <div className="flex justify-between">
          <h3 className="mb-6 font-bold text-grayScale/30">Dados do produto</h3>
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentStatus === "ANUNCIADO" || values.status === "ANUNCIADO"
                  ? "bg-blue-100 text-blue-800"
                  : currentStatus === "VENDIDO" || values.status === "VENDIDO"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {currentStatus || values.status}
            </span>
          </div>
        </div>

        <div className="flex gap-7 ">
          <div className="w-full bg-transparent py-3 px-2 outline-none ">
            <Input
              label="Titulo"
              required
              readOnly={false}
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              aria-readonly={readOnlys}
            />
          </div>

          <div className="w-full bg-transparent py-3 px-2 outline-none relative">
            <label htmlFor="price" className="font-medium text-grayScale">
              Valor *
            </label>
            <div className="w-full bg-transparent px-2 outline-none relative ">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary font-bold text-sm z-10 select-none">
                R$
              </span>
              <input
                id="price"
                type="number"
                placeholder="0,00"
                className="w-full border-b border-b-grayScale/50 pl-10 pr-3 py-2 bg-transparent outline-none text-grayScale focus:border-primary transition-colors"
                value={values.price || ""}
                onChange={(e) =>
                  setValues({ ...values, price: Number(e.target.value) })
                }
                readOnly={readOnlys}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-transparent py-3 px-2 outline-none">
          <label
            htmlFor="description"
            className="text-grayScale font-medium block mb-1"
          >
            Descrição *
          </label>
          <textarea
            id="description"
            placeholder="Digite a descrição do produto..."
            className="w-full border-b border-b-grayScale/50 py-3 bg-transparent outline-none text-grayScale focus:border-primary transition-colors resize-none min-h-[80px]"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            readOnly={readOnlys}
            required
            rows={3}
            wrap="soft"
            maxLength={500}
          />
          <div className="text-xs text-grayScale/60 mt-1 text-right">
            {values.description.length}/500 caracteres
          </div>
        </div>

        <div className="w-full border-b border-b-grayScale/50">
          <label htmlFor="select" className="text-primary font-medium">
            Categoria
          </label>
          <select
            name="categoria"
            required
            id="select"
            className="w-full h-[48px] outline-none p-3 text-grayScale"
            value={values.categoryId || ""}
            onChange={(e) =>
              setValues({ ...values, categoryId: e.target.value })
            }
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex gap-3 mt-[40px]">
          <Button className="h-[48px]" onClick={handleHome}>
            <span className="flex w-full justify-center ">Cancelar</span>
          </Button>

          <Button className="h-[48px]" type="submit">
            <span className="flex w-full justify-center">
              Salvar e Publicar
            </span>
          </Button>
        </div>
        {error && <div className="text-red-500 mt-4 text-[10px]">{error}</div>}
      </div>
    </form>
  );
};

export default RegistrationProductForm;
