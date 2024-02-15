import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

import "./search.css";

export default function Search({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchKey, setSearchKey] = useState("firstName");

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onSearch(searchKey, debouncedValue);
        // eslint-disable-next-line
    }, [debouncedValue, searchKey]);

    const searchDict = {
        firstName: "Имя",
        lastName: "Фамилия",
        maidenName: "Отчество",
        age: "Возраст",
        gender: "Пол",
        phone: "Номер телефона",
        "address.address": "Улица",
        "address.city": "Город",
    };

    return (
        <div className="search">
            <select
                className="search__select"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            >
                {Object.keys(searchDict).map((key, index) => (
                    <option value={key} key={index}>
                        {searchDict[key]}
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
