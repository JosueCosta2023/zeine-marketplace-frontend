import DashBoardChart from "../components/DashBoardChart";

const AdministratorPage = () => {
  return (
    <div className="flex flex-col p-20">
        <div className="w-full mb-[40px]">
            <h2 className="text-[24px] font-bold text-darkLight">Últimos 30 dias</h2>
            <p className="text-sm text-grayScale">Confira as estatísticas da sua loja no ultimo mês.</p>
        </div>
      <div className="flex gap-10">
        <div className="w-[350px] h-[450px] bg-red-500 flex flex-col justify-between">
            <div className="w-full h-[30%] bg-yellow-300 "> </div>
            <div className="w-full h-[30%] bg-yellow-300 "> </div>
            <div className="w-full h-[30%] bg-yellow-300 "> </div>
        </div>
        <DashBoardChart />
      </div>
    </div>
  );
};

export default AdministratorPage;
