import { useAuth } from "../../../contexts/AuthContext";
import ArchiveImport from "../../commun/ArchiveImport/ArchiveImport";
import DashBoardCards from "../components/DashboardCards";
import DashBoardChart from "../components/DashBoardChart";

const AdministratorPage = () => {

  const {user} = useAuth()

  const primeiroNome = user?.name.split(" ");

  const dataCard = [
    {
      id: "001",
      icon: ArchiveImport.archives.images.saleTag,
      title: 24,
      description: "Produtos vendidos",
    },
    {
      id: "002", 
      icon: ArchiveImport.archives.images.Store,
      title: 56,
      description: "Produtos anunciado",
    },
    {
      id: "003",
      icon: ArchiveImport.archives.images.VectorPeople,
      title: 1.238,
      description: "Pessoas visitantes",
    },
  ];

  return (
    <div className="flex flex-col p-20">
      <div className="w-full mb-[40px]">
        <p className="text-[10px]">Olá <strong className="text-primary">{primeiroNome ? primeiroNome[0] : ""}</strong>, esta é a analise dos</p>
        <h2 className="text-[24px] font-bold text-darkLight">
          Últimos 12 meses
        </h2>
        <p className="text-sm text-grayScale">
          Confira as estatísticas da sua loja.
        </p>
      </div>

      <div className="flex gap-10">
        <div className="w-[340px] h-[360px]  flex flex-col justify-between">
          {dataCard.map((data) => (
            <DashBoardCards
              key={data.id}
              id={data.id}
              icon={data.icon}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
        <DashBoardChart />
      </div>
    </div>
  );
};

export default AdministratorPage;
