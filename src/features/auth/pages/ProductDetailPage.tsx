import { Link, useNavigate, useParams } from "react-router-dom";
import RegistrationProductForm from "../components/RegistrationProductForm";
import { TbArrowLeft, TbCircleOff } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { ProductFormValues } from "../../../types/globalTypes";
import {
  fetchProduct,
  updateProduct,
} from "../../../services/productService";
import DelayedLoading from "../../../components/DelayedLoading";
import { MdDoneAll } from "react-icons/md";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [productStatus, setProductStatus] = useState<string>("ANUNCIADO");

  useEffect(() => {
    if (!id) return;
    fetchProduct({id})
      .then((data) => {
        const normalizeStatus = data.status || "ANUNCIADO";
        setProduct({
          ...data,
          status: normalizeStatus,
        });
        setProductStatus(normalizeStatus);

        if (!data.status || data.status.trim() === "") {
          updateProduct(id, {
            ...data,
            status: normalizeStatus,
          }).catch((error) => {
            console.error("Erro ao normalizar status:", error);
          });
        }
      })

      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdateProduct = async (updatedProduct: ProductFormValues) => {
    try {
      const productWithStatus = {
        ...updatedProduct,
        status: productStatus,
      };

      await updateProduct(id!, productWithStatus);
      console.log("Produto atualizado com sucesso!");

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/products");
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  };

  const handleMarkAsSold = async () => {
    if (productStatus === "CANCELADO") return;

    const newStatus = productStatus === "VENDIDO" ? "ANUNCIADO" : "VENDIDO";

    setProductStatus(newStatus);

    try {
      const updatedProduct = {
        ...product!,
        status: newStatus,
      };

      await updateProduct(id!, updatedProduct);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      setProductStatus(productStatus);
    }
  };

  const handleDesactiveAd = async () => {
    const newStatus = productStatus === "CANCELADO" ? "ANUNCIADO" : "CANCELADO";
    setProductStatus(newStatus);

    try {
      const updatedProduct = { ...product!, status: newStatus };

      await updateProduct(id!, updatedProduct);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      setProductStatus(productStatus);
    }
  };

  if (loading) {
    return (
      <DelayedLoading loading={loading} minShow={600} delay={200}>
        <div className="text-primary text-loading">
          Carregando detalhes do produto...
        </div>
      </DelayedLoading>
    );
  }

  if (!product)
    return (
      <div className="text-primary text-loading">Produto não encontrado</div>
    );

  return (
    <div className="flex flex-col p-20 w-full relative">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <FiCheck size={18} />
          Produto atualizado com sucesso!
        </div>
      )}
      <div className="w-full mb-10">
        <Link to={"/products"} className="flex gap-3 items-center text-primary">
          <TbArrowLeft />
          Voltar
        </Link>
        <h3 className="text-2xl text-darkLight font-bold">Editar Produto</h3>
        <div className="w-full flex justify-between">
          <p>Gerenciar as informações do {product.title}.</p>
          <div className="flex gap-5">
            <label
              htmlFor="vendido"
              className={`flex items-center gap-1 cursor-pointer font-bold transition-all duration-200 ${
                productStatus === "CANCELADO"
                  ? "text-gray cursor-not-allowed line-through"
                  : " text-primary hover:text-primary/80"
              }`}
            >
              <input
                type="checkbox"
                id="vendido"
                className="hidden"
                checked={productStatus === "VENDIDO"}
                onChange={handleMarkAsSold}
                disabled={productStatus === "CANCELADO"}
              />
              <span className="flex items-center gap-1">
                {productStatus === "VENDIDO" ? (
                  <MdDoneAll size={18} />
                ) : (
                  <FiCheck size={16} />
                )}
                <span>Marcar como vendido</span>
              </span>
            </label>

            <label
              htmlFor="cancelado"
              className="flex items-center gap-1 text-primary cursor-pointer font-bold hover:text-primary/80 transition-all duration-200"
              title="Clique para ativar ou desativar anuncio"
            >
              <input
                type="checkbox"
                id="cancelado"
                className="hidden"
                checked={productStatus === "CANCELADO"}
                onChange={handleDesactiveAd}
              />

              <span className="flex items-center gap-1">
                {productStatus === "CANCELADO" ? (
                  <TbCircleOff size={18} className="text-red-600" />
                ) : (
                  <TbCircleOff size={18} />
                )}
                <span>
                  {productStatus === "CANCELADO" ? "Ativar" : "Cancelar"}{" "}
                  Anuncio
                </span>
              </span>
            </label>
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
          currentStatus={productStatus}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
