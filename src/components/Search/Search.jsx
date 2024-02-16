import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

import "./search.css";

/**
 * Компонент для поиска с выбором полей
 *
 * @param {object} selectDict - словарь для полей
 * @param {function} onSearch - обработчик поиска
 */
export default function Search({ selectDict, onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchKey, setSearchKey] = useState("firstName");

    // Используем debounce для задержки срабатывания поиска
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onSearch(searchKey, debouncedValue);
        // eslint-disable-next-line
    }, [debouncedValue]);

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
