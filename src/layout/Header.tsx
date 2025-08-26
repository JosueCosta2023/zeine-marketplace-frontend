import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ArchiveImport from "../features/commun/ArchiveImport/ArchiveImport";
import Button from "../components/Button";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { MdAccountBox } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [menuOpen]);

  const handlePerfilPage = () => {
    navigate("/user")
  }

  return (
    <header className=" flex items-center justify-evenly h-[64px] px-6 shadow-sm border-b-[1px] border-b-gray border-opacity-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={ArchiveImport.archives.images.logo}
          alt="Logo simples"
          className="h-8"
        />
      </div>

      {/* Navegação */}
      <div className="w-[1030px] flex justify-center ">
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
      </div>

      {/* Ações */}
      <div className="flex gap-3 items-center">
        <Link to="/products/register">
          <Button className="h-[40px]">
            Novo produto
            <FiPlus size={16} />
          </Button>
        </Link>

        <div className="relative" ref={menuRef}>
          <img
            src={user?.photo}
            alt="perfil"
            className="w-[48px] h-[48px] rounded-[12px] object-cover border border-l-primary"
            onClick={() => setMenuOpen((open) => !open)}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded shadow-lg border z-20">
              <button
                className="w-full items-center justify-between flex text-left px-4 py-2 hover:bg-primary/10 text-primary"
                onClick={() => {
                  handlePerfilPage()
                  setMenuOpen(false);
                }}
              >
                Minha conta
                <MdAccountBox size={18} />
              </button>
              <button
                className="w-full items-center justify-between flex text-left px-4 py-2 hover:bg-primary/10 text-primary"
                onClick={() => {
                  logout()
                  setMenuOpen(false);
                }}
              >
                Sair
                <FiLogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
