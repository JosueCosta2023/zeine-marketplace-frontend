import RegistrationProductForm from "../components/RegistrationProductForm";


const RegistrationProductPage = () => {
  return (
    <div className="flex flex-col p-20 w-full">
      <div className="w-full mb-10">
        <h3 className="text-2xl text-darkLight font-bold">Novo Produto</h3>
        <p>Cadastre um produto para venda no marketplace</p>
      </div>
      <RegistrationProductForm />
    </div>
  );
};

export default RegistrationProductPage;
