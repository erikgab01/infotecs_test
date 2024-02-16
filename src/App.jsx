import { useEffect, useRef, useState } from "react";
import { fetchAllUsers, fetchFilteredUsers } from "./services/userService";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

import fieldsDict from "./utils/fieldsDict";

function App() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Функция для перевода данных из API в подходящий формат (берем только те поля, которые нужны)
     *
     * @param {object} data - данные из API.
     */
    function handleUsersObject(data) {
        if (data === null) {
            setError("Произошла ошибка при загрузке данных");
            return;
        }
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

    /**
     * Функция для обработки поиска пользователей по всей таблице
     *
     * @param {string} key - поле, по которому ищем
     * @param {string} value - поисковый запрос
     */
    async function handleSearch(key, value) {
        setIsLoading(true);
        const users = await fetchFilteredUsers(key, value);
        handleUsersObject(users);
        setIsLoading(false);
    }

    // Первоначальная загрузка всех пользователей
    useEffect(() => {
        (async () => {
            const users = await fetchAllUsers();
            handleUsersObject(users);
            setIsLoading(false);
        })();
        // eslint-disable-next-line
    }, []);

    // Список колонок таблицы (с рефами на них и дополнительной информацией)
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
            {error ? <p className="error">{error}</p> : null}
            {isLoading ? <p>Загрузка...</p> : <Table data={users} columns={columns} />}
        </>
    );
}

export default App;
