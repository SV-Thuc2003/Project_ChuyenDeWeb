// src/hooks/useProductFilters.ts
import { useState } from 'react';
import { Brand, FilterCategory, WaterCategory, WaterTag, PriceRange} from '../types/Product';
//, Product 
export const useProductFilters = () => {
  const [categories] = useState<WaterCategory[]>([
    { id: 1, name: 'Máy lọc nước', image: 'https://cdn.tgdd.vn/Category//3385/may-loc-nuoc-kangaroo-kg10a3-1-1-120x120.png', vectorImage: 'https://cdn.tgdd.vn/Category//3385/may-loc-nuoc-kangaroo-kg10a3-1-1-120x120.png' },
    { id: 2, name: 'Máy lọc điện giải', image: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/13518/04/b8/04b889ca325147bf60e95e97266a5034.png', vectorImage: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/13518/04/b8/04b889ca325147bf60e95e97266a5034.png'},
    { id: 3, name: 'Máy lọc nước RO Hydrogen', image: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/13519/d2/7c/d27c8b3d1d73c059095a608444b6ce0a.png', vectorImage: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/13519/d2/7c/d27c8b3d1d73c059095a608444b6ce0a.png' },
    { id: 4, name: 'Lõi máy lọc nước', image: 'https://cdn.tgdd.vn/Category//5105/loi-may-loc-nuoc-120-120x120.png', vectorImage: 'https://cdn.tgdd.vn/Category//5105/loi-may-loc-nuoc-120-120x120.png' },
    { id: 5, name: 'Lọc nước không điện', image: 'https://cdn.tgdd.vn/Category//9678/tren-bon-rua-cleansui-et101-120x120-120x120.png', vectorImage: 'https://cdn.tgdd.vn/Category//9678/tren-bon-rua-cleansui-et101-120x120-120x120.png' },
    { id: 6, name: 'Cốc lọc nước đầu nguồn', image: 'https://cdn.tgdd.vn/Category//8579/Coc-loc-nuoc-120-120x120.png', vectorImage: 'https://cdn.tgdd.vn/Category//8579/Coc-loc-nuoc-120-120x120.png' },
  ]);

  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
    { id: 1, name: 'Nội thất', count: 21, checked: false },
    { id: 2, name: 'Khay thức ăn', count: 28, checked: false },
    { id: 3, name: 'Đồ thú cưng', count: 12, checked: false },
    { id: 4, name: 'Thức ăn', count: 80, checked: false },
    { id: 5, name: 'Đồ chơi', count: 90, checked: false },
    { id: 6, name: 'Khuyễn mãi', count: 24, checked: false },
  ]);

  const [brands, setBrands] = useState<Brand[]>([
    { id: 1, name: 'Perflast', count: 28, checked: false },
    { id: 2, name: 'Pet care', count: 18, checked: false },
    { id: 3, name: 'Petmate', count: 16, checked: false },
    { id: 4, name: 'Hagen', count: 40, checked: false },
    { id: 5, name: 'PetSafe', count: 28, checked: false },
    { id: 6, name: 'CATS LOVE', count: 18, checked: false },
  ]);

  const [tags, setTags] = useState<WaterTag[]>([
    { id: 1, name: 'Chó', selected: false },
    { id: 2, name: 'Mèo', selected: false },
    { id: 3, name: 'Tự nhiên', selected: false },
    { id: 4, name: 'Vẹt', selected: false },
    { id: 5, name: 'Cún con', selected: false },
    { id: 6, name: 'Mèo con', selected: false },
  ]);

  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 200000, max: 10000000 });

  const handleCategoryChange = (id: number) => {
    setFilterCategories(prev =>
      prev.map(cat => cat.id === id ? { ...cat, checked: !cat.checked } : cat)
    );
  };

  const handleBrandChange = (id: number) => {
    setBrands(prev =>
      prev.map(brand => brand.id === id ? { ...brand, checked: !brand.checked } : brand)
    );
  };

  const handleTagSelect = (id: number) => {
    setTags(prev =>
      prev.map(tag => tag.id === id ? { ...tag, selected: !tag.selected } : tag)
    );
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setPriceRange(range);
  };

  return {
    categories,
    filterCategories,
    brands,
    tags,
    priceRange,
    handleCategoryChange,
    handleBrandChange,
    handleTagSelect,
    handlePriceRangeChange,
  };
};
