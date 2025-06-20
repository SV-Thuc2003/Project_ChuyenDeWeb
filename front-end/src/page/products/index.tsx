// src/pages/Products.tsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const useQuery = () => new URLSearchParams(useLocation().search);

const Products: React.FC = () => {
  const { t } = useTranslation();
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
  const [selectedSort, setSelectedSort] = useState("createdAt,desc");

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

  useEffect(() => {
    if (mode !== 'all') return;
    updateState({ products: allProducts, totalPages: allPages, totalResults: allResults });
    setLoading(allLoading);
    setError(allError);
  }, [mode, allProducts, allPages, allResults, allLoading, allError, updateState]);

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
        if (!cancelled) setError(err.message || t('products.error'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [mode, keyword, currentPage, pageSize, categoryIdNum, getFilterRequest, updateState, t]);

  useEffect(() => setCurrentPage(1), [keyword, categoryIdNum, isFiltered]);

  const handlePageChange = (p: number) => {
    if (p !== currentPage) {
      setCurrentPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyFilters = () => setIsFiltered(true);

  const handleSortChange = async (sort: string) => {
    setSelectedSort(sort);
    if (!categoryIdNum) return;
    const req = getFilterRequest(currentPage - 1, pageSize, categoryIdNum);
    req.sort = sort;
    setLoading(true);
    setError(null);
    try {
      const data = await filterProducts(req);
      updateState(data);
    } catch (err: any) {
      setError(err.message || t('products.sortError'));
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
              { label: t('products.breadcrumb.home'), path: '/' },
              keyword
                  ? { label: t('products.breadcrumb.search', { keyword }) }
                  : categoryIdNum
                      ? { label: t('products.breadcrumb.category', { name: currentCategory?.name || categoryIdNum }) }
                      : { label: t('products.breadcrumb.all') },
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
                {isLoading && <p>{t('products.loading')}</p>}
                {errMsg && <p className="text-red-500">{errMsg}</p>}
                {noData && <p>{t('products.noData')}</p>}
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
                        selectedSort={selectedSort}
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
