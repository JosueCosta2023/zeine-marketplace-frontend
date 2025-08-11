import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FiImage } from "react-icons/fi";
import type { ProductFormValues } from "../../../types/globalTypes";
import { getCategories } from "../../../services/categoryService";
import { BiEditAlt } from "react-icons/bi";
import {sha256} from "js-sha256"

interface ProductFormProsp {
  initialValues?: ProductFormValues;
  readOnlys?: boolean;
  onSubmit?: (values: ProductFormValues) => void;
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
  },
  readOnlys = false,
  onSubmit,
}) => {
  const [values, setValues] = React.useState<ProductFormValues>(initialValues);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const photoHash = sha256(photo || "")

    if (onSubmit) onSubmit({...values, photo: photoHash || "", status: values.status || "ANUNCIADO"});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {

    const file = e.target.files[0];
    const reader = new FileReader();


    if(file.size > 500 * 1024){
      setError("A imagem deve ter no maximo 500kb");
      return
    }


    reader.onload = (ev) => {
      const img = new window.Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if(ctx){
          ctx.drawImage(img, 0, 0);

          const webDataUrl = canvas.toDataURL("image/webp", 0.8)
          setPhoto(webDataUrl)
         }

      }
      img.src = ev.target?.result as string;
    }
    reader.readAsDataURL(file)
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
      setError("Este campo e obrigatorio.");
      return false;
    }

    setError(null);
    return true;
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setPhoto(initialValues.photo || null);
    setValues(initialValues);
  }, [initialValues?.id]);


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
      <div className="bg-white rounded-[20px] p-[32px] w-[591px] h-[490px]">
        <h3 className="mb-6">Dados do produto</h3>
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
            {error && <div className="text-red-500 mb-4 text-[10px]">{error}</div>}
          </div>

          <div className="w-full bg-transparent py-3 px-2 outline-none ">
            <Input
              label="Valor"
              required
              type="number"
              placeholder="R$: 000.00"
              value={values.price}
              onChange={(e) =>
                setValues({ ...values, price: Number(e.target.value) })
              }
              aria-readonly={readOnlys}
            />
            {error && <div className="text-red-500 mb-4 text-[10px]">{error}</div>}
          </div>
        </div>

        <div className="w-full bg-transparent py-3 px-2 outline-none ">
          <Input
            label="Descrição"
            required
            type="text"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            aria-readonly={readOnlys}
          />

          {error && <div className="text-red-500 mb-4 text-[10px]">{error}</div>}
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
          <Button className="h-[48px]">
            <span className="flex w-full justify-center ">Cancelar</span>
          </Button>

          <Button className="h-[48px]" type="submit">
            <span className="flex w-full justify-center">
              Salvar e Publicar
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationProductForm;
