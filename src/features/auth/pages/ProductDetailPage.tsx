import { Link, useParams } from "react-router-dom";
import ProductForm from "../components/RegistrationProductForm";
import { TbArrowLeft, TbCircleOff } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { Product } from "../../../types/globalTypes";
import { getProductById } from "../../../services/productService";
import DelayedLoading from "../../../components/DelayedLoading";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if(!id) return
      getProductById(id).then(setProduct).finally(() => setLoading(false))
  }, [])

  if(loading){
    return(
      <DelayedLoading loading={loading} minShow={600} delay={200}>
        <div className="text-primary text-loading">Carregando detalhes do produto...</div>
      </DelayedLoading>
    )
  }

  if(!product) return <div className="text-primary text-loading">Produto não encontrado</div>



  return (
    <div className="flex flex-col p-20 w-full">
      <div className="w-full mb-10">
        <Link to={"/products"} className="flex gap-3 items-center text-primary">
          <TbArrowLeft />
          Voltar
        </Link>
        <h3 className="text-2xl text-darkLight font-bold">Editar Produto</h3>
        <div className="w-full flex justify-between">
          <p>Gerencie as informações do produto cadastrado</p>
          <div className="flex gap-5">
            <p className="flex items-center gap-1 text-primary cursor-pointer font-bold">
              <FiCheck /> Marcar como vendido
            </p>
            <p className="flex items-center gap-1 text-primary cursor-pointer font-bold">
              <TbCircleOff /> Desativar anuncio
            </p>
          </div>
        </div>
      </div>
      {product && (
        <ProductForm
        initialValues={{
          ...product,
          id: Number(product.id),
          categoryId: product.categoryId ?? "",
        }}
        readOnlys
      />
      )}
    </div>
  );
};

export default ProductDetailPage;
