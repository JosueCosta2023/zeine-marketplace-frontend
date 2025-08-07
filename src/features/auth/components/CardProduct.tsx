import { useEffect, useState } from "react"
import { getCategoryById } from "../../../services/categoryService"

interface CardProdutProsp{
    image: string,
    title: string,
    price: number,
    description: string,
    tags?: string[],
    categoryId?: string
}


const CardProduct = ({image, title, price, description, categoryId}: CardProdutProsp) => {
    
    const [category, setCategory] = useState<{id: string; name: string } | null>(null)

    useEffect(() => {
        if(categoryId){
            getCategoryById(categoryId).then(setCategory)
        }
    }, [categoryId])

    console.log(category)


    return(
        <div className="w-[331px] h-[250px] relative flex flex-col bg-white rounded-[20px]">
            <div className="absolute flex right-3 top-3 gap-2">
                <span className="px-[8px] py-[4px] rounded-xl bg-secondary text-white text-[10px] font-semibold">ANUNCIADO</span>
                <span className="px-[8px] py-[4px] rounded-xl bg-dark text-white text-[10px] font-semibold">{category ? category?.name : "Sem Categoria"}</span>
                
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