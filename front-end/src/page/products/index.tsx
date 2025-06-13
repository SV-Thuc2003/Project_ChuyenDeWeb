import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import HeroSection from '../../components/common/HeroSection';
import CategorySection from './CategorySection';
import FilterSection from './FilterSection';
import ProductGrid from './ProductGrid';
import { useProductsByCategory } from '../../hooks/products/useProductsByCategory';
import { useProductFilters } from '../../hooks/useProductFilters';

const Products: React.FC = () => {
  // Lấy categoryId từ URL param (ví dụ bạn đổi slug thành id)
  const { categoryId } = useParams<{ categoryId: string }>();

  const {
    categories,
    filterCategories,
    brands,
    tags,
    priceRange,
    handleCategoryChange,
    handleBrandChange,
    handleTagSelect,
    handlePriceRangeChange
  } = useProductFilters();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Convert categoryId sang number và truyền vào hook
  const numericCategoryId = Number(categoryId);
  console.log("Category ID:", numericCategoryId);
  const { products, totalPages, totalResults, loading, error } = useProductsByCategory(
    numericCategoryId,
    currentPage - 1,
    pageSize
  );

  const handleApplyFilters = () => {
    console.log('Applying filters...');
    // TODO: add filtering logic
  };

  const handleSortChange = (value: string) => {
    console.log('Sort changed to:', value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteToggle = (id: number) => {
    console.log(`Toggling favorite for product ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection categories={categories} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection
                categories={filterCategories}
                brands={brands}
                tags={tags}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onBrandChange={handleBrandChange}
                onTagSelect={handleTagSelect}
                onPriceRangeChange={handlePriceRangeChange}
                onApplyFilters={handleApplyFilters}
              />
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <p>Đang tải sản phẩm...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
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
