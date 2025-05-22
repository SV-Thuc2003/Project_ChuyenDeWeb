import { memo } from "react";
import "./FilterBar.scss";

const FilterBar = memo(({ categories, brand, onChange, onFilter }) => {
    return (
        <div className="filter-bar">
            <select name="category" onChange={onChange} value={brand.category}>
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                name="brand"
                placeholder="Thương hiệu"
                value={brand.brand}
                onChange={onChange}
            />

            <button onClick={onFilter}>Lọc</button>
        </div>
    );
});

export default FilterBar;
