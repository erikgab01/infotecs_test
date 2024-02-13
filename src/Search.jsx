import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

export default function Search({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchKey, setSearchKey] = useState("firstName");

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onSearch(searchKey, debouncedValue);
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
        <div className="controls">
            <select title="search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
                {Object.keys(searchDict).map((key, index) => (
                    <option value={key} key={index}>
                        {searchDict[key]}
                    </option>
                ))}
            </select>
            <input
                placeholder="Введите запрос"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            ></input>
        </div>
    );
}
