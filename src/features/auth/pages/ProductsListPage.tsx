import { Link } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import { BiSearch } from "react-icons/bi";
import { BsFillTagsFill } from "react-icons/bs";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { fetchProduct, getProducts } from "../../../services/productService";
import { getCategories } from "../../../services/categoryService";
import type { Product } from "../../../types/globalTypes";
import DelayedLoading from "../../../components/DelayedLoading";

interface Category {
  id: string;
  name: string;
}

const ProductsListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // ✅ Adicionar state para categorias
  const [loading, setLoading] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [status, setStatus] = useState("");

  // ✅ Função única para normalizar dados
  const normalizeProductsData = (response: any): Product[] => {
    if (Array.isArray(response)) {
      return response;
    } else if (
      response?.data?.products &&
      Array.isArray(response.data.products)
    ) {
      return response.data.products;
    } else if (response?.data?.result && Array.isArray(response.data.result)) {
      return response.data.result;
    } else if (response?.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response?.result && Array.isArray(response.result)) {
      return response.result;
    } else if (response?.products && Array.isArray(response.products)) {
      return response.products;
    }
    return [];
  };

  // ✅ Carregamento inicial - produtos E categorias
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        console.log("🔄 Carregando produtos e categorias...");

        // Carregar produtos e categorias em paralelo
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (isMounted) {
          const productsArray = normalizeProductsData(productsResponse);
          console.log("✅ Produtos carregados:", productsArray);
          console.log("✅ Categorias carregadas:", categoriesResponse);

          setProducts(productsArray);
          setCategories(categoriesResponse || []);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar dados iniciais:", error);
        if (isMounted) {
          setProducts([]);
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setTimeout(() => setLoading(false), 1000);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Função para carregar produtos com filtros
  const loadProductsWithFilters = async (filters = {}) => {
    setLoading(true);

    try {
      console.log("📤 Filtros enviados para backend:", filters);
      const response = await fetchProduct(filters);
      const productsArray = normalizeProductsData(response);

      console.log("📥 Response do backend:", response);
      console.log("📦 Produtos filtrados processados:", productsArray);

      setProducts(productsArray);
    } catch (error) {
      console.error("❌ Erro ao carregar produtos com filtros:", error);
      setProducts([]);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // ✅ Aplicar filtros - CORRIGIDO
  const applyFilters = () => {
    const filters: any = {};

    // ✅ Converter nome da categoria para ID
    if (categorySearch.trim()) {
      const categoryFound = categories.find((cat) =>
        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
      );

      if (categoryFound) {
        filters.categoryId = categoryFound.id; // ✅ Usar o ID da categoria
        console.log(
          `🔍 Categoria "${categorySearch}" encontrada com ID: ${categoryFound.id}`
        );
      } else {
        console.log(`❌ Categoria "${categorySearch}" não encontrada`);
        // Se não encontrar a categoria, ainda assim tenta buscar
        // Pode ser que o usuário digitou o ID diretamente
        filters.categoryId = categorySearch.trim();
      }
    }

    if (status) {
      filters.status = status;
    }

    console.log("📋 Filtros finais:", filters);

    // Se não há filtros, recarrega todos os produtos
    if (Object.keys(filters).length === 0) {
      setLoading(true);
      getProducts()
        .then((response) => {
          const productsArray = normalizeProductsData(response);
          setProducts(productsArray);
        })
        .catch((error) => {
          console.error("❌ Erro ao recarregar produtos:", error);
          setProducts([]);
        })
        .finally(() => setLoading(false));
    } else {
      // Se há filtros, usa a função de filtros
      loadProductsWithFilters(filters);
    }
  };

  // Limpar filtros
  const clearFilter = () => {
    setCategorySearch("");
    setStatus("");

    // Recarregar todos os produtos
    setLoading(true);
    getProducts()
      .then((response) => {
        const productsArray = normalizeProductsData(response);
        setProducts(productsArray);
      })
      .catch((error) => {
        console.error("❌ Erro ao limpar filtros:", error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <DelayedLoading loading={loading} minShow={1500} delay={300}>
        <div className="text-loading text-primary">Carregando Produtos...</div>
      </DelayedLoading>
    );
  }
  return (
    <div className="flex p-20 w-full">
      <div className="flex flex-col w-full">
        <div className="w-full mb-[40px]">
          <h2 className="text-[24px] font-bold text-darkLight">
            Seus Produtos
          </h2>
          <p className="text-sm text-grayScale">
            Acesse gerencie a sua lista de produtos a venda
          </p>
        </div>

        <div className="flex gap-6">
          <div>
            <div className="w-[327px] bg-white rounded-[20px] p-6">
              <span className="font-bold text-lg text-grayScale">Filtrar</span>
              <div className="w-full mb-5 border-b-[1px] border-b-slate-400/40 flex items-center gap-1 h-[48px]">
                <label htmlFor="search" className="text-grayScale">
                  <BiSearch size={24} />
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Pesquisar Categoria"
                  className="w-full text-[16px] outline-none px-3 bg-transparent"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
              </div>
              <div className="w-full border-b-[1px] border-b-slate-400/40 flex items-center gap-1 h-[48px]">
                <label htmlFor="select" className="text-grayScale">
                  <BsFillTagsFill />
                </label>
                <select
                  name=""
                  id="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full outline-none text-grayScale p-3"
                >
                  <option value="">Status</option>
                  <option value="VENDIDO">Vendido</option>
                  <option value="CANCELADO">Cancelado</option>
                  <option value="ANUNCIADO">Anunciado</option>
                </select>
              </div>

              <div className="mt-[40px] flex gap-2">
                <Button onClick={applyFilters}>
                  <span className="w-full">Aplicar Filtro</span>
                </Button>

                {(categorySearch || status) && (
                  <Button
                    onClick={clearFilter}
                    className="w-full py-2 text-sm text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded"
                  >
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="w-[679px]  rounded-[20px] flex flex-wrap gap-4 ">
            {/* Contador de resultados da filtragem */}
            <div className="w-full mb-4">
              <p className="text-sm text-grayScale">
                Mostrando {products?.length || 0} produtos
                {(categorySearch || status) && (
                  <span className="text-primary"> (filtrados)</span>
                )}
              </p>
            </div>

            {products && products.length > 0 ? (
              products?.map((product) => {
                console.log("Renderizado:", product)
                console.log("Renderizado id:", product.id)
                return (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <CardProduct
                      image={product.photo}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      categoryId={product.categoryId}
                      status={product.status}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-grayScale">
                  {products === null
                    ? "Carregando produtos..."
                    : categorySearch || status
                    ? "Nenhum produto encontrado com os filtros aplicados."
                    : "Nenhum produto cadastrado."}
                </p>
                {(categorySearch || status) &&
                  products &&
                  products.length === 0 && (
                    <button
                      onClick={clearFilter}
                      className="mt-2 text-primary hover:underline text-sm"
                    >
                      Limpar filtros e ver todos os produtos
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
