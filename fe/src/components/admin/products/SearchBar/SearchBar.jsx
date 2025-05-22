import { memo } from "react";
import "./SearchBar.scss";

const SearchBar = memo(({ keyword, onChange, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={onChange}
            />
            <button onClick={onSearch}>Tìm kiếm</button>
        </div>
    );
});

export default SearchBar;
