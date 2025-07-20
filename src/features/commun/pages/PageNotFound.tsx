import { Link } from "react-router-dom";
import Button from "../../auth/components/Button";
import { HiHome } from "react-icons/hi";
import ArchiveImport from "../ArchiveImport/ArchiveImport";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" flex p-[10px]  rounded-md mb-10">
        <img src={ArchiveImport.archives.images.logo} alt="imagem" />
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg">Página não encontrada ou</p>
      <p className="text-lg">em Desenvolvimento</p>
      <div className="max-w-[300px] min-w-[150px] mt-10">
        <Button>
          <Link to="/" className="text-center w-full flex items-center gap-3 justify-center">Voltar Home {<HiHome/>}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
