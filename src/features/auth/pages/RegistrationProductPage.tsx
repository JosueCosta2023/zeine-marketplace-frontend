import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/productService";
import RegistrationProductForm from "../components/RegistrationProductForm";
import type { ProductFormValues } from "../../../types/globalTypes";
import { useAuth } from "../../../contexts/AuthContext";


const RegistrationProductPage = () => {

  const navigate = useNavigate();
  const user = useAuth()

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await createProduct(values);
      navigate("/products")    
    } catch (error) {
      console.error("Erro ao cadastrar produto!", error)
    }
  }


  return (
    <div className="flex flex-col p-20 w-full">
      <div className="w-full mb-10">
        <h3 className="text-2xl text-darkLight font-bold">Novo Produto</h3>
        <p>Cadastre um produto para venda no marketplace</p>
      </div>
      <RegistrationProductForm onSubmit={handleSubmit} userId={user?.user?.id} />
    </div>
  );
};

export default RegistrationProductPage;
