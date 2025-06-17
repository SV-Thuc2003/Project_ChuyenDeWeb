// src/pages/Products.tsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CategorySection from './CategorySection';
import FilterSection from './FilterSection';
import ProductGrid from './ProductGrid';

import { useProductFilters } from '../../hooks/useProductFilters';
import { useAllProducts } from '../../hooks/products/useAllProducts';
import {
  fetchProductsByCategory,
  searchProducts,
} from '../../Service/products';
import { filterProducts } from '../../Service/FilteredProductsService';
import { Product } from '../../types/Product';

// ---------- helper hook ----------
const useQuery = () => new URLSearchParams(useLocation().search);
// ----------------------------------

const Products: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const query = useQuery();
  const keyword = query.get('keyword')?.trim() || '';
  const categoryIdNum = categoryId ? Number(categoryId) : null;

  const {
    categories, brands, tags, priceRange,
    handleBrandChange, handleTagSelect, handlePriceRangeChange,
    getFilterRequest,
  } = useProductFilters();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const mode = useMemo<'search' | 'filtered' | 'category' | 'all'>(() => {
    if (keyword) return 'search';
    if (isFiltered && categoryIdNum) return 'filtered';
    if (categoryIdNum) return 'category';
    return 'all';
  }, [keyword, isFiltered, categoryIdNum]);

  const {
    products: allProducts,
    totalPages: allPages,
    totalResults: allResults,
    loading: allLoading,
    error: allError,
  } = useAllProducts({ page: currentPage, size: pageSize });

  const updateState = useCallback(
    (data: { products: Product[]; totalPages: number; totalResults: number }) => {
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalResults);
    },
    []
  );

  // 🟢 Effect riêng cho mode === 'all'
  useEffect(() => {
    if (mode !== 'all') return;

    updateState({
      products: allProducts,
      totalPages: allPages,
      totalResults: allResults,
    });
    setLoading(allLoading);
    setError(allError);
  }, [mode, allProducts, allPages, allResults, allLoading, allError, updateState]);

  // 🟢 Effect cho các mode còn lại (search, category, filtered)
  useEffect(() => {
    if (mode === 'all') return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        switch (mode) {
          case 'search':
            data = await searchProducts(keyword, currentPage - 1, pageSize);
            break;
          case 'filtered':
            data = await filterProducts(
              getFilterRequest(currentPage - 1, pageSize, categoryIdNum!)
            );
            break;
          case 'category':
            data = await fetchProductsByCategory(
              categoryIdNum!, currentPage - 1, pageSize
            );
            break;
        }
        if (!cancelled) updateState(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Lỗi khi tải sản phẩm');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, keyword, currentPage, pageSize, categoryIdNum, getFilterRequest, updateState]);

  useEffect(() => setCurrentPage(1), [keyword, categoryIdNum, isFiltered]);

  const handlePageChange = (p: number) => {
    if (p !== currentPage) {
      setCurrentPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyFilters = () => {
    setIsFiltered(true);
  };

  const handleSortChange = async (sort: string) => {
    if (!categoryIdNum) return;
    const req = getFilterRequest(currentPage - 1, pageSize, categoryIdNum);
    req.sort = sort;

    setLoading(true);
    setError(null);
    try {
      const data = await filterProducts(req);
      updateState(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi sắp xếp');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (id: number) => {
    console.log(`Toggle favorite ${id}`);
  };

  const currentCategory = categories.find(c => c.id === categoryIdNum);

  const isLoading = mode === 'all' ? allLoading : loading;
  const errMsg = mode === 'all' ? allError : error;
  const noData = products.length === 0 && !isLoading && !errMsg;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Breadcrumb
        items={[
          { label: 'Trang chủ', path: '/' },
          keyword
            ? { label: `Tìm kiếm: "${keyword}"` }
            : categoryIdNum
            ? { label: `Danh mục: ${currentCategory?.name || categoryIdNum}` }
            : { label: 'Tất cả sản phẩm' },
        ]}
      />

      <main className="flex-grow">
        <CategorySection categories={categories} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection
                brands={brands}
                tags={tags}
                priceRange={priceRange || { min: 0, max: 0 }}
                onBrandChange={handleBrandChange}
                onTagSelect={handleTagSelect}
                onPriceRangeChange={handlePriceRangeChange}
                onApplyFilters={handleApplyFilters}
              />
            </div>

            <div className="lg:col-span-3">
              {isLoading && <p>Đang tải sản phẩm...</p>}
              {errMsg && <p className="text-red-500">{errMsg}</p>}
              {noData && <p>Không có sản phẩm nào.</p>}

              {!isLoading && !errMsg && products.length > 0 && (
                <ProductGrid
                  products={products}
                  totalResults={totalResults}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  onSortChange={handleSortChange}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;


// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import Header from "../../components/layout/header/header";
// import Footer from "../../components/layout/footer/footer";
// import Breadcrumb from "../../components/ui/Breadcrumb";
// import CategorySection from "./CategorySection";
// import FilterSection from "./FilterSection";
// import ProductGrid from "./ProductGrid";
// import { useProductFilters } from "../../hooks/useProductFilters";
// import {
//   fetchProductsByCategory,
//   searchProducts,
// } from "../../Services/products";
// import { Product } from "../../types/Product";
// import { filterProducts } from "../../Services/FilteredProductsService";

// // 🔍 Custom hook để lấy query string
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const Products: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const query = useQuery();
//   const keyword = query.get("keyword");

//   const {
//     categories,
//     brands,
//     tags,
//     priceRange,
//     handleBrandChange,
//     handleTagSelect,
//     handlePriceRangeChange,
//     getFilterRequest,
//   } = useProductFilters();

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 12;

//   const [products, setProducts] = useState<Product[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isFiltered, setIsFiltered] = useState(false);

//   const categoryIdNum = categoryId ? Number(categoryId) : null;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         if (keyword) {
//           const data = await searchProducts(keyword, currentPage - 1, pageSize);
//           setProducts(data.products);
//           setTotalPages(data.totalPages);
//           setTotalResults(data.totalResults);
//           return;
//         }

//         if (isFiltered && categoryIdNum !== null) {
//           const filterRequest = getFilterRequest(
//             currentPage - 1,
//             pageSize,
//             categoryIdNum
//           );
//           const data = await filterProducts(filterRequest);
//           setProducts(data.products);
//           setTotalPages(data.totalPages);
//           setTotalResults(data.totalResults);
//         } else if (categoryIdNum !== null) {
//           const data = await fetchProductsByCategory(
//             categoryIdNum,
//             currentPage - 1,
//             pageSize
//           );
//           setProducts(data.products);
//           setTotalPages(data.totalPages);
//           setTotalResults(data.totalResults);
//         } else {
//           setProducts([]);
//           setTotalPages(0);
//           setTotalResults(0);
//         }
//       } catch (err) {
//         setError("Lỗi khi tải sản phẩm");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [keyword, categoryIdNum, currentPage, isFiltered]);

//   // Reset page về 1 khi keyword thay đổi
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [keyword]);

//   const handleApplyFilters = async () => {
//     setCurrentPage(1);
//     setIsFiltered(true);

//     if (categoryIdNum === null) return;

//     const request = getFilterRequest(0, pageSize, categoryIdNum);
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await filterProducts(request);
//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//       setTotalResults(data.totalResults);
//     } catch (err: any) {
//       setError(err.message || "Lỗi khi áp dụng bộ lọc");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSortChange = async (sort: string) => {
//     if (categoryIdNum === null) return;
//     const request = getFilterRequest(currentPage - 1, pageSize, categoryIdNum);
//     request.sort = sort;
//     setLoading(true);
//     try {
//       const data = await filterProducts(request);
//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//       setTotalResults(data.totalResults);
//     } catch (err: any) {
//       setError(err.message || "Lỗi khi sắp xếp");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleFavoriteToggle = (id: number) => {
//     console.log(`Toggling favorite for product ${id}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <Breadcrumb
//         items={[
//           { label: "Trang chủ", path: "/" },
//           keyword
//             ? { label: `Tìm kiếm: "${keyword}"` }
//             : categoryId
//             ? { label: `Danh mục ${categoryId}` }
//             : { label: "Sản phẩm" },
//         ]}
//       />
      
//       <main className="flex-grow">
//         <CategorySection categories={categories} />
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-1">
//               <FilterSection
//                 brands={brands}
//                 tags={tags}
//                 priceRange={priceRange || { min: 0, max: 0 }}
//                 onBrandChange={handleBrandChange}
//                 onTagSelect={handleTagSelect}
//                 onPriceRangeChange={handlePriceRangeChange}
//                 onApplyFilters={handleApplyFilters}
//               />
//             </div>

//             <div className="lg:col-span-3">
//               {loading ? (
//                 <p>Đang tải sản phẩm...</p>
//               ) : error ? (
//                 <p className="text-red-500">{error}</p>
//               ) : products.length === 0 ? (
//                 <p>Không có sản phẩm nào.</p>
//               ) : (
//                 <ProductGrid
//                   products={products}
//                   totalResults={totalResults}
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   pageSize={pageSize}
//                   onPageChange={handlePageChange}
//                   onSortChange={handleSortChange}
//                   onFavoriteToggle={handleFavoriteToggle}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Products;