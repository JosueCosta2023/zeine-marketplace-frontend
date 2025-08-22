import { useEffect, useState } from "react"
import { getCategories } from "../../../services/categoryService"

interface CardProdutProsp{
    image: string,
    title: string,
    price: number,
    description: string,
    status?: string,
    categoryId?: string
}


const CardProduct = ({image, title, price, description, categoryId, status}: CardProdutProsp) => {
      const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [categoryName, setCategoryName] = useState<string>("Sem Categoria");

    useEffect(() => {
        getCategories().then((cats) => {
            setCategories(cats);
            const found = cats.find((cat: { id: string; name: string }) => cat.id === categoryId);
            setCategoryName(found ? found.name : "Sem Categoria");
        });
    }, [categoryId]);

    return(
        <div className="w-[331px] h-[250px] relative flex flex-col bg-white rounded-[20px]">
            <div className="absolute flex right-3 top-3 gap-2">


                <span className={`px-[8px] py-[4px] rounded-xl text-[10px] font-bold ${
                    status === "ANUNCIADO" ? "bg-blue-300 text-blue-800" :
                    status === "VENDIDO" ? "bg-green-300 text-green-800" :
                    status === "CANCELADO" ? "bg-red-300 text-red-800" : 
                    "bg-gray-500"
                }`}
                
                >{status || "Sem Status"}</span>



                <span className="px-[8px] py-[4px] rounded-xl bg-dark text-white text-[10px] font-semibold">{categoryName.toLocaleUpperCase()}</span>
                
            </div>
            <div className="w-full h-[144px] rounded-[26px] mb-3">
                <img src={image ? image : "https://cdn.iset.io/assets/73735/produtos/2223/2.png" } alt={title} className="object-cover rounded-[26px] h-full w-full p-2 " />
            </div>

            <div className="flex justify-between px-2 font-bold w-full mb-2 text-[16px] text-grayScale">
                <span>{title}</span>
                <span>R$: {price}</span>
            </div>

            <p className="text-grayScale text-sm px-2">{description}</p>
        </div>

    )
}

export default CardProduct