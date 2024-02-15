import { useEffect, useRef, useState } from "react";
import { fetchAllUsers, fetchFilteredUsers } from "./services/userService";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

import fieldsDict from "./utils/fieldsDict";

function App() {
    const [users, setUsers] = useState([]);

    function handleUsersObject(data) {
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

    async function handleSearch(key, value) {
        const users = await fetchFilteredUsers(key, value);
        handleUsersObject(users);
    }

    useEffect(() => {
        (async () => {
            const users = await fetchAllUsers();
            handleUsersObject(users);
        })();
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
            <Search selectDict={fieldsDict} onSearch={handleSearch} />
            <Table data={users} columns={columns} />
        </>
    );
}

export default App;
