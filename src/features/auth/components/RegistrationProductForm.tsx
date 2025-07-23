import React, { useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FiImage } from "react-icons/fi";

export interface ProductFormValues {
  id?: number;
  title: string;
  price: number;
  description: string;
  image?: string;
  status?: string;
  categoryId: string;
}

interface ProductFormProsp {
  initialValues?: ProductFormValues;
  readOnlys?: boolean;
  onSubmit?: (values: ProductFormValues) => void;
}

const ProductForm: React.FC<ProductFormProsp> = ({
  initialValues = { title: "", price: 0, description: "", image: "", categoryId: "", status: "" },
  readOnlys = false,
  onSubmit,
}) => {
  const [values, setValues] = React.useState<ProductFormValues>(initialValues);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (ev) => setImage(ev.target?.result as string);

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    setImage(initialValues.image || null);
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
        {image ? (
          <>
            <img
              src={image}
              alt="Imagem de produto"
              className="w-full h-full rounded-[20px] p-1 shadow"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FiImage size={36} />
            <span>Selecione a imagem do produto</span>
          </div>
        )}
        <input
          type="file"
          accept="imageProducts/"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

      {/* right side */}
      <div className="bg-white rounded-[20px] p-[32px] w-[591px] h-[490px]">
        <h3 className="mb-6">Dados do produto</h3>
        <div className="flex gap-7 ">
          <Input
            label="Titulo"
            readOnly={false}
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            aria-readonly={readOnlys}
          />
          <Input
            label="Valor"
            type="number"
            placeholder="R$: 000.00"
            value={values.price}
            onChange={(e) =>
              setValues({ ...values, price: Number(e.target.value) })
            }
            aria-readonly={readOnlys}
          />
        </div>
        <Input
          label="Descrição"
          type="text"
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          aria-readonly={readOnlys}
        />

        <div className="w-full border-b border-b-grayScale/50">
          <label htmlFor="select" className="text-primary font-medium">
            Categoria
          </label>
          <select
            name="categoria"
            id="select"
            className="w-full h-[48px] outline-none p-3 text-grayScale"
            value={values.categoryId || ""}
            onChange={(e) => setValues({ ...values, categoryId: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="MOVEL">Móvel</option>
            <option value="BRINQUEDOS">Brinquedos</option>
            <option value="PAPELARIA">Papelaria</option>
            <option value="SAUDE E BELEZA">Saude e Beleza</option>
            <option value="UTENSILIO">Utensílio</option>
            <option value="VESTUARIO">Vestuario</option>
          </select>
        </div>

        <div className="w-full flex gap-3 mt-[40px]">
          <Button className="h-[48px]">
            <span className="flex w-full justify-center ">Cancelar</span>
          </Button>

          <Button className="h-[48px]">
            <span className="flex w-full justify-center">
              Salvar e Publicar
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
