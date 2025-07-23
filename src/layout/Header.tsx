import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import ArchiveImport from "../features/commun/ArchiveImport/ArchiveImport";
import Button from "../components/Button";
import { FiPlus } from "react-icons/fi";

const Header = () => {
  return (
    <header className=" flex items-center justify-between bg-accent h-[64px] px-6 shadow-sm border-b-[1px] border-b-gray border-opacity-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={ArchiveImport.archives.images.logo}
          alt="Logo simples"
          className="h-8"
        />
      </div>

      {/* Navegação */}
      <nav className="flex gap-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded-[8px] font-medium text-sm transition
        ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-grayScale hover:bg-gray-100"
        }`
          }
        >
          <TbChartHistogram size={18} />
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded-[8px] font-medium text-sm transition
        ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-grayScale hover:bg-gray-100"
        }`
          }
        >
          <GiCardboardBoxClosed size={18} />
          Produtos
        </NavLink>
      </nav>

      {/* Ações */}
      <div className="flex gap-3 items-center">
        <Link to="/products/register">
          <Button className="h-[40px]">
            <FiPlus size={16} />
            Novo produto
          </Button>
        </Link>

        <img
          src={ArchiveImport.archives.images.personDefaultImage}
          alt="perfil"
          className="w-[48px] h-[48px] rounded-[12px] object-cover border border-l-primary"
        />
      </div>
    </header>
  );
};

export default Header;
