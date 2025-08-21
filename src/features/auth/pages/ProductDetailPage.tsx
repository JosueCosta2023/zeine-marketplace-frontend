import { Link, useNavigate, useParams } from "react-router-dom";
import RegistrationProductForm from "../components/RegistrationProductForm";
import { TbArrowLeft, TbCircleOff } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { ProductFormValues } from "../../../types/globalTypes";
import { getProductById, updateProduct } from "../../../services/productService";
import DelayedLoading from "../../../components/DelayedLoading";


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductFormValues | null>(null)
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
      if(!id) return
      getProductById(id).then(setProduct).finally(() => setLoading(false))
  }, [])

  const handleUpdateProduct = async (updatedProduct: ProductFormValues) => {
    try {
      await updateProduct(id!, updatedProduct);
      console.log("Produto atualizado com sucesso!")

      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        navigate("/products")
      }, 3000);

    } catch (error) {
      console.error("Erro ao atualizar produto: ", error)
    }

  }



  if(loading){
    return(
      <DelayedLoading loading={loading} minShow={600} delay={200}>
        <div className="text-primary text-loading">Carregando detalhes do produto...</div>
      </DelayedLoading>
    )
  }

  if(!product) return <div className="text-primary text-loading">Produto não encontrado</div>



  return (
    <div className="flex flex-col p-20 w-full relative">
      {
        showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
            <FiCheck size={18}/>
            Produto atualizado com sucesso!
          </div>
        )
      }
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
        <RegistrationProductForm
        initialValues={{
          ...product,
          categoryId: product.categoryId ?? "",
          userId: product.userId || "",
        }}
        readOnlys={false}
        onSubmit={handleUpdateProduct}
      />
      )}
    </div>
  );
};

export default ProductDetailPage;
