interface DashBradCarsdProps {
    id: string,
    icon: string,
    title: number,
    description: string
}

const DashBoardCards = ({icon, title, description}: DashBradCarsdProps) => {

    return(
        <div className="flex gap-4 w-full p-[10px] rounded-[20px] h-[30%] items-center bg-white">
            <div className="bg-secondaryLight rounded-[12px] w-[80px] h-[86px] flex p-[25px]">
                <img src={icon} alt="image teste" />
            </div>
            <div>
                <p className="text-[28px] text-darkLight font-bold">{title}</p>
                <span className="text-[12px] text-grayScale">{description}</span>
            </div>
        </div>
    )
}

export default DashBoardCards