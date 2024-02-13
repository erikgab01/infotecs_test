import { useEffect, useState } from "react";
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

    async function fetchFilteredData(key, value) {
        if (!value) {
            fetchAllData();
            return;
        }
        const response = await fetch(
            `https://dummyjson.com/users/filter?key=${key}&value=${value}`
        );
        const data = await response.json();
        handleData(data);
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    const columns = [
        {
            label: "ФИО",
            accessor: "name",
            sortable: true,
        },
        {
            label: "Возраст",
            accessor: "age",
            sortable: true,
        },
        {
            label: "Пол",
            accessor: "gender",
            sortable: true,
        },
        {
            label: "Телефон",
            accessor: "phone",
            sortable: false,
        },
        {
            label: "Адрес",
            accessor: "address",
            sortable: true,
        },
    ];

    return (
        <>
            <Search onSearch={fetchFilteredData} />
            <Table data={users} columns={columns} />
        </>
    );
}

export default App;
