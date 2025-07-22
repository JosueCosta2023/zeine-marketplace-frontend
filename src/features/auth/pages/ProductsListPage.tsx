import { Link } from "react-router-dom";
import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";
import CardProduct from "../components/CardProduct";
import { BiSearch } from "react-icons/bi";
import { BsFillTagsFill } from "react-icons/bs";
import Button from "../components/Button";

const ProductsListPage = () => {

    const dataProduct = [
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 1",
            price: 149.67,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 2",
            price: 19.67,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 3",
            price: 120,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 4",
            price: 49.67,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 5",
            price: 14.7,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 6",
            price: 129.3,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 7",
            price: 9.67,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
        {
            image: ArchiveImport.archives.images.SampleImage,
            title: "Produto 8",
            price: 147,
            description: "Este produto obteve recordes de vendas, abaixe o preço em sinal de agradecimento.",
            tags: ["VENDIDO", "MOVEL"]
        },
    ]



    
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
                        <label htmlFor="search" className="text-grayScale"><BiSearch size={24}/></label>
                        <input type="text" id="search" placeholder="Pesquisar Categoria" className="w-full text-[16px] outline-none px-3 bg-transparent" />
                    </div>
                    <div className="w-full border-b-[1px] border-b-slate-400/40 flex items-center gap-1 h-[48px]">
                        <label htmlFor="search" className="text-grayScale"><BsFillTagsFill/></label>
                        <select name="" id="" className="w-full outline-none text-grayScale p-3">
                            <option value="">Status</option>
                            <option value="">Vendido</option>
                            <option value="">Cancelado</option>
                            <option value="">Anunciado</option>
                        </select>
                    </div>

                    <div className="mt-[40px]">
                        <Button>
                            Aplicar Filtro
                        </Button>
                    </div>
            </div>

            <div className="w-[679px]  rounded-[20px] flex flex-wrap gap-4 ">
                {dataProduct.map((product, index) => (
                    <Link
                        to={`/products/${index}`}
                    >
                        <CardProduct
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            description={product.description}
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
