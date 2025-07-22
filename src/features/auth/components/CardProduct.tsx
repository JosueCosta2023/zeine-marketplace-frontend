
interface CardProdutProsp{
    image: string,
    title: string,
    price: number,
    description: string,
    tags?: string[]
}

const CardProduct = ({image, title, price, description}: CardProdutProsp) => {
    return(
        <div className="w-[331px] h-[250px] relative flex flex-col bg-white rounded-[20px]">
            <div className="absolute flex right-3 top-3 gap-2">
                <span className="px-[8px] py-[4px] rounded-xl bg-secondary text-white text-[10px] font-semibold">ANUNCIADO</span>
                <span className="px-[8px] py-[4px] rounded-xl bg-dark text-white text-[10px] font-semibold">MOVEL</span>
                
            </div>
            <div className="w-full h-[144px] rounded-[26px] mb-3">
                <img src={image} alt={title} className="object-cover rounded-[26px] h-full w-full p-2 " />
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