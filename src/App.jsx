import { useEffect, useRef, useState } from "react";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

function App() {
    const [users, setUsers] = useState([]);

    function handleData(data) {
        const users = data.users.map((users) => ({
            id: users.id,
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
        // eslint-disable-next-line
    }, []);

    const columns = [
        {
            label: "ФИО",
            accessor: "name",
            sortable: true,
            ref: useRef(),
        },
        {
            label: "Возраст",
            accessor: "age",
            sortable: true,
            ref: useRef(),
        },
        {
            label: "Пол",
            accessor: "gender",
            sortable: true,
            ref: useRef(),
        },
        {
            label: "Телефон",
            accessor: "phone",
            sortable: false,
            ref: useRef(),
        },
        {
            label: "Адрес",
            accessor: "address",
            sortable: true,
            ref: useRef(),
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
