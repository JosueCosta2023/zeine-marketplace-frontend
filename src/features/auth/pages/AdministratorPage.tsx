import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";
import DashBoardCards from "../components/DashboardCards";
import DashBoardChart from "../components/DashBoardChart";

const AdministratorPage = () => {

  const dataCard = [
    {icon:ArchiveImport.archives.images.saleTag, title: 24, description: "Produtos vendidos"},
    {icon:ArchiveImport.archives.images.Store, title: 56, description: "Produtos anunciado"},
    {icon:ArchiveImport.archives.images.VectorPeople, title: 1.238, description: "Pessoas visitantes"}
  ]


  return (
    <div className="flex flex-col p-20">
        <div className="w-full mb-[40px]">
            <h2 className="text-[24px] font-bold text-darkLight">Últimos 30 dias</h2>
            <p className="text-sm text-grayScale">Confira as estatísticas da sua loja no ultimo mês.</p>
        </div>


      <div className="flex gap-10">
        <div className="w-[340px] h-[360px]  flex flex-col justify-between">
            {dataCard.map((data) => (
              <DashBoardCards icon={data.icon} title={data.title} description={data.description}/>
            ))
          }
        </div>
        <DashBoardChart />
      </div>
    </div>
  );
};

export default AdministratorPage;
