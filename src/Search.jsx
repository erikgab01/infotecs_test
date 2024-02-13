import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

export default function Search({ onSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchKey, setSearchKey] = useState("firstName");

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        onSearch(searchKey, debouncedValue);
    }, [debouncedValue, searchKey, onSearch]);

    const searchDict = {
        firstName: "First name",
        lastName: "Last name",
        maidenName: "Maiden name",
        age: "Age",
        gender: "Gender",
        phone: "Phone number",
        "address.address": "Street",
        "address.city": "City",
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
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            ></input>
        </div>
    );
}
