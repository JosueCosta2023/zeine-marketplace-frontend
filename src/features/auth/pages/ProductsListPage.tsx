import { Link } from "react-router-dom";
import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";
import CardProduct from "../components/CardProduct";

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
            <div className="w-[327px] h-[306px] rounded-[20px] bg-blue-500">
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
