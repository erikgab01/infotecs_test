import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

import "./search.css";

export default function Search({ selectDict, onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchKey, setSearchKey] = useState("firstName");

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onSearch(searchKey, debouncedValue);
        // eslint-disable-next-line
    }, [debouncedValue, searchKey]);

    return (
        <div className="search">
            <select
                className="search__select"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            >
                {Object.keys(selectDict).map((key, index) => (
                    <option value={key} key={index}>
                        {selectDict[key]}
                    </option>
                ))}
            </select>
            <input
                className="search__input"
                placeholder="Введите запрос"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            ></input>
        </div>
    );
}
