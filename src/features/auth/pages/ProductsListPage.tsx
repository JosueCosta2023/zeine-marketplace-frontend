import { Link } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { BiSearch } from "react-icons/bi";
import { BsFillTagsFill } from "react-icons/bs";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import type { Product } from "../../../types/globalTypes";
import DelayedLoading from "../../../components/DelayedLoading";

type ProductsResponse = {
  data: {
    products: Product[];
  };
};

const ProductsListPage = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then(setProducts)
      .finally(() => setTimeout(() => {
        if(isMounted) setLoading(false)
      }, 1000));
    return () => {isMounted = false}
  }, []);

  if (loading)
    return (
      <DelayedLoading loading={loading} minShow={2000} delay={300}>
        <div className="text-loading text-primary bg-primartLight">Carregado Produtos...</div>
      </DelayedLoading>
    );

    console.log(products)

  return (
    <div className="flex p-20 w-full">
      <div className="flex flex-col w-full">
        <div className="w-full mb-[40px]">
          <h2 className="text-[24px] font-bold text-darkLight">
            Seus Produtos
          </h2>
          <p className="text-sm text-grayScale">
            Acesse gerencie a sua lista de produtos a venda
          </p>
        </div>

        <div className="flex gap-6">
          <div className="w-[327px] h-[306px] bg-white rounded-[20px] p-6">
            <span className="font-bold text-lg text-grayScale">Filtrar</span>
            <div className="w-full mb-5 border-b-[1px] border-b-slate-400/40 flex items-center gap-1 h-[48px]">
              <label htmlFor="search" className="text-grayScale">
                <BiSearch size={24} />
              </label>
              <input
                type="text"
                id="search"
                placeholder="Pesquisar Categoria"
                className="w-full text-[16px] outline-none px-3 bg-transparent"
              />
            </div>
            <div className="w-full border-b-[1px] border-b-slate-400/40 flex items-center gap-1 h-[48px]">
              <label htmlFor="select" className="text-grayScale">
                <BsFillTagsFill />
              </label>
              <select
                name=""
                id="select"
                className="w-full outline-none text-grayScale p-3"
              >
                <option value="">Status</option>
                <option value="VENDIDO">Vendido</option>
                <option value="CANCELADO">Cancelado</option>
                <option value="ANUNCIADO">Anunciado</option>
              </select>
            </div>

            <div className="mt-[40px]">
              <Button>
                <span className="w-full">Aplicar Filtro</span>
              </Button>
            </div>
          </div>

          <div className="w-[679px]  rounded-[20px] flex flex-wrap gap-4 ">
            {products?.data.products &&
              products?.data.products.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <CardProduct
                    image={product.photo}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    categoryId={product.categoryId}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
