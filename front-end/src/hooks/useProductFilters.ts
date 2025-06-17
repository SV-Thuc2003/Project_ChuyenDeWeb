// import { useCallback, useEffect, useState } from 'react';
// import { fetchAllCategories, fetchAllBrands, fetchPriceRangeByCategory } from '../Services/products';
// import { ProductFilterRequest } from '../Services/FilteredProductsService';
// import { Brand, FilterCategory, WaterCategory, WaterTag, PriceRange } from '../types/Product';

// export const useProductFilters = (categoryId?: number) => {
//   const [categories, setCategories] = useState<WaterCategory[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
//     { id: 1, name: 'Máy lọc RO', count: 10, checked: false },
//     { id: 2, name: 'Máy lọc Nano', count: 5, checked: false },
//     { id: 3, name: 'Có điện', count: 20, checked: false },
//     { id: 4, name: 'Không điện', count: 8, checked: false },
//     { id: 5, name: 'Có tủ', count: 6, checked: false },
//     { id: 6, name: 'Không tủ', count: 14, checked: false },
//   ]);

//   const [tags, setTags] = useState<WaterTag[]>([
//     { id: 1, name: 'Hydrogen', selected: false },
//     { id: 2, name: 'Điện giải', selected: false },
//     { id: 3, name: 'Nóng lạnh', selected: false },
//     { id: 4, name: 'Không tủ', selected: false },
//     { id: 5, name: 'Lõi lọc', selected: false },
//   ]);

//   const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
//   const [priceChanged, setPriceChanged] = useState(false);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [categoryData, brandData] = await Promise.all([
//           fetchAllCategories(),
//           fetchAllBrands(),
//         ]);

//         setCategories(
//           categoryData.map((c: any) => ({
//             id: c.id,
//             name: c.name,
//             image: c.imageUrl || '',
//             vectorImage: c.imageUrl || '',
//           }))
//         );

//         setBrands(
//           brandData.map((b: any) => ({
//             id: b.id,
//             name: b.name,
//             image: b.logoUrl || '',
//             count: 0,
//             checked: false,
//           }))
//         );
//       } catch (err) {
//         console.error('Lỗi khi tải filters:', err);
//       }
//     };

//     fetchFilters();
//   }, []);

//   // Lấy priceRange dựa vào categoryId truyền vào hoặc filterCategories
//   useEffect(() => {
//   const selectedCategoryId = filterCategories.find(fc => fc.checked)?.id 
//                           ?? (typeof categoryId === 'number' ? categoryId : null);

//   if (!selectedCategoryId) {
//     setPriceRange(null);
//     return;
//   }

//   fetchPriceRangeByCategory(selectedCategoryId)
//     .then(range => {
//       setPriceRange(range);
//       setPriceChanged(false);
//     })
//     .catch(err => {
//       console.error('Lỗi khi lấy khoảng giá:', err);
//       setPriceRange(null);
//       setPriceChanged(false);
//     });
// }, [filterCategories]); // ⚠️ Chỉ phụ thuộc vào category thay đổi


//   const handleBrandChange = (id: number) => {
//     setBrands(prev =>
//       prev.map(brand => (brand.id === id ? { ...brand, checked: !brand.checked } : brand))
//     );
//   };

//   const handleTagSelect = (id: number) => {
//     setTags(prev =>
//       prev.map(tag => (tag.id === id ? { ...tag, selected: !tag.selected } : tag))
//     );
//   };

//   const handlePriceRangeChange = (range: PriceRange) => {
//     setPriceRange(range);
//     setPriceChanged(true);
//   };

//   const resetFilters = () => {
//     setFilterCategories(prev => prev.map(item => ({ ...item, checked: false })));
//     setBrands(prev => prev.map(item => ({ ...item, checked: false })));
//     setTags(prev => prev.map(item => ({ ...item, selected: false })));
//     setPriceRange(null);
//     setPriceChanged(false);
//   };

//   const getFilterRequest = useCallback(
//   (
//     page: number = 0,
//     size: number = 12,
//     externalCategoryId?: number
//   ): ProductFilterRequest => {
//     const selectedBrandIds = brands.filter(b => b.checked).map(b => b.id);
//     const selectedCategory = filterCategories.find(fc => fc.checked);
//     const selectedCategoryId =
//       selectedCategory ? selectedCategory.id : (externalCategoryId ?? categoryId);

//     const filterPairs: Record<string, string> = {};
//     tags.forEach(tag => {
//       if (tag.selected) filterPairs[tag.name] = 'true';
//     });

//     return {
//       categoryId: selectedCategoryId,
//       brandIds: selectedBrandIds.length ? selectedBrandIds : undefined,
//       minPrice: priceChanged && priceRange ? priceRange.min : undefined,
//       maxPrice: priceChanged && priceRange ? priceRange.max : undefined,
//       filterPairs: Object.keys(filterPairs).length ? filterPairs : undefined,
//       sort: 'price,asc',
//       page,
//       size,
//     };
//   },
//   [
//     brands,               // đổi khi tick/untick brand
//     filterCategories,     // đổi khi chọn category con
//     tags,                 // đổi khi chọn tag
//     priceChanged, priceRange,
//     categoryId            // khi URL category đổi
//   ]
// );

//   return {
//     categories,
//     filterCategories,
//     setFilterCategories,
//     brands,
//     tags,
//     priceRange,
//     handleBrandChange,
//     handleTagSelect,
//     handlePriceRangeChange,
//     resetFilters,
//     getFilterRequest,
//   };
// };


import { useCallback, useEffect, useState } from 'react';
import {
  fetchAllCategories,
  fetchAllBrands,
  fetchPriceRangeByCategory,
} from '../Service/products';
import { ProductFilterRequest } from '../Service/FilteredProductsService';
import {
  Brand,
  FilterCategory,
  WaterCategory,
  WaterTag,
  PriceRange,
} from '../types/Product';

export const useProductFilters = (categoryId?: number) => {
  const [categories, setCategories] = useState<WaterCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([
    { id: 1, name: 'Máy lọc RO', count: 10, checked: false },
    { id: 2, name: 'Máy lọc Nano', count: 5, checked: false },
    { id: 3, name: 'Có điện', count: 20, checked: false },
    { id: 4, name: 'Không điện', count: 8, checked: false },
    { id: 5, name: 'Có tủ', count: 6, checked: false },
    { id: 6, name: 'Không tủ', count: 14, checked: false },
  ]);

  const [tags, setTags] = useState<WaterTag[]>([
    { id: 1, name: 'Hydrogen', selected: false },
    { id: 2, name: 'Điện giải', selected: false },
    { id: 3, name: 'Nóng lạnh', selected: false },
    { id: 4, name: 'Không tủ', selected: false },
    { id: 5, name: 'Lõi lọc', selected: false },
  ]);

  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [priceChanged, setPriceChanged] = useState(false);

  // ✅ Tách category dùng để lấy khoảng giá riêng ra
  const [priceCategoryId, setPriceCategoryId] = useState<number | undefined>(
    categoryId
  );

  // Fetch filters ban đầu
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoryData, brandData] = await Promise.all([
          fetchAllCategories(),
          fetchAllBrands(),
        ]);

        setCategories(
          categoryData.map((c: any) => ({
            id: c.id,
            name: c.name,
            image: c.imageUrl || '',
            vectorImage: c.imageUrl || '',
          }))
        );

        setBrands(
          brandData.map((b: any) => ({
            id: b.id,
            name: b.name,
            image: b.logoUrl || '',
            count: 0,
            checked: false,
          }))
        );
      } catch (err) {
        console.error('Lỗi khi tải filters:', err);
      }
    };

    fetchFilters();
  }, []);

  // ✅ Theo dõi categoryId đầu vào thay đổi → cập nhật lại
  useEffect(() => {
    setPriceCategoryId(categoryId);
  }, [categoryId]);

  // ✅ Gọi API lấy priceRange khi priceCategoryId thay đổi
  useEffect(() => {
    if (!priceCategoryId) {
      setPriceRange(null);
      return;
    }

    fetchPriceRangeByCategory(priceCategoryId)
      .then(range => {
        setPriceRange(range);
        setPriceChanged(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy khoảng giá:', err);
        setPriceRange(null);
        setPriceChanged(false);
      });
  }, [priceCategoryId]);

  const handleBrandChange = (id: number) => {
    setBrands(prev =>
      prev.map(brand =>
        brand.id === id ? { ...brand, checked: !brand.checked } : brand
      )
    );
  };

  const handleTagSelect = (id: number) => {
    setTags(prev =>
      prev.map(tag =>
        tag.id === id ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };

  const handlePriceRangeChange = (range: PriceRange) => {
    setPriceRange(range);
    setPriceChanged(true);
  };

  const resetFilters = () => {
    setFilterCategories(prev => prev.map(item => ({ ...item, checked: false })));
    setBrands(prev => prev.map(item => ({ ...item, checked: false })));
    setTags(prev => prev.map(item => ({ ...item, selected: false })));
    setPriceRange(null);
    setPriceChanged(false);
    setPriceCategoryId(categoryId);
  };

  const getFilterRequest = useCallback(
    (
      page: number = 0,
      size: number = 12,
      externalCategoryId?: number
    ): ProductFilterRequest => {
      const selectedBrandIds = brands.filter(b => b.checked).map(b => b.id);
      const selectedCheckboxCategory = filterCategories.find(fc => fc.checked);

      const selectedCategoryId =
        typeof externalCategoryId === 'number'
          ? externalCategoryId
          : selectedCheckboxCategory?.id ?? categoryId;

      // ✅ cập nhật categoryId dùng để fetch price range nếu thay đổi
      if (
        selectedCategoryId &&
        selectedCategoryId !== priceCategoryId
      ) {
        setPriceCategoryId(selectedCategoryId);
      }

      const filterPairs: Record<string, string> = {};
      tags.forEach(tag => {
        if (tag.selected) filterPairs[tag.name] = 'true';
      });

      return {
        categoryId: selectedCategoryId,
        brandIds: selectedBrandIds.length ? selectedBrandIds : undefined,
        minPrice: priceChanged && priceRange ? priceRange.min : undefined,
        maxPrice: priceChanged && priceRange ? priceRange.max : undefined,
        filterPairs: Object.keys(filterPairs).length ? filterPairs : undefined,
        sort: 'price,asc',
        page,
        size,
      };
    },
    [brands, filterCategories, tags, priceChanged, priceRange, categoryId, priceCategoryId]
  );

  return {
    categories,
    filterCategories,
    setFilterCategories,
    brands,
    tags,
    priceRange,
    handleBrandChange,
    handleTagSelect,
    handlePriceRangeChange,
    resetFilters,
    getFilterRequest,
  };
};
