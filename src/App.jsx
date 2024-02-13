import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";
import Search from "./Search";

function App() {
    const [users, setUsers] = useState([]);

    function handleData(data) {
        const users = data.users.map((users) => ({
            name: users.lastName + " " + users.firstName + " " + users.maidenName,
            age: users.age,
            gender: users.gender,
            phone: users.phone,
            address: users.address.address + ", " + users.address.city,
        }));
        setUsers(users);
    }

    async function fetchAllData() {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        handleData(data);
    }

    // useCallback для избавления от лишних ререндеров компонента Search
    const fetchFilteredData = useCallback(async (key, value) => {
        if (!value) {
            fetchAllData();
            return;
        }
        const response = await fetch(
            `https://dummyjson.com/users/filter?key=${key}&value=${value}`
        );
        const data = await response.json();
        handleData(data);
    }, []);

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <>
            <Search onSearch={fetchFilteredData} />
            <Table rows={users} />
        </>
    );
}

export default App;
