import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";

function App() {
    const [users, setUsers] = useState([]);

    async function fetchData() {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        const users = data.users.map((users) => ({
            name: users.lastName + " " + users.firstName + " " + users.maidenName,
            age: users.age,
            gender: users.gender,
            phone: users.phone,
            address: users.address.address + ", " + users.address.city,
        }));
        setUsers(users);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Table rows={users} />
        </>
    );
}

export default App;
