import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';

interface FilterSectionProps {
  brands: any[];
  tags: any[];
  priceRange: { min: number; max: number };
  onBrandChange: (id: number) => void;
  onTagSelect: (id: number) => void;
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onApplyFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  brands,
  tags,
  priceRange,
  onBrandChange,
  onTagSelect,
  onPriceRangeChange,
  onApplyFilters,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalPriceRange((prev) => ({
      ...prev,
      max: value,
    }));
  };

  const handleApplyClick = () => {
    onPriceRangeChange(localPriceRange);
    onApplyFilters();
  };

  return (
    <aside className="w-full">
      {/* Brands */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Lọc theo thương hiệu</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandChange(brand.id)}
              className={`flex items-center justify-center p-2 border rounded-xl bg-white transition hover:shadow-md
                ${brand.checked ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200'}`}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-9 object-contain pointer-events-none select-none"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Lọc theo giá</h3>
        <input
          type="range"
          min={200000}
          max={10000000}
          step={100000}
          value={localPriceRange.max}
          onChange={handleRangeChange}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="mt-4 text-base font-medium">
          Giá: {localPriceRange.min.toLocaleString()}đ - {localPriceRange.max.toLocaleString()}đ
        </p>
        <Button
          variant="primary"
          className="mt-4 bg-black text-white"
          onClick={handleApplyClick}
        >
          Áp dụng
        </Button>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Lọc theo thẻ</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagSelect(tag.id)}
              className={`py-2 px-4 rounded-xl text-base font-semibold ${
                tag.selected
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-50 text-black border-2 border-gray-50'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSection;
