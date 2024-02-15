import { useEffect, useRef, useState } from "react";
import useSort from "../../hooks/useSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Modal from "../Modal/Modal";
import UserInfo from "./UserInfo";

import "./table.css";

export default function Table({ data, columns }) {
    const [tableHeight, setTableHeight] = useState("auto");
    const [tableData, updateTableData, handleSorting] = useSort(data);
    const [isResizing, setIsResizing] = useState(false);
    const [tableModalShow, setTableModalShow] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const table = useRef(null);

    async function getUserById(userId) {
        if (!userId) {
            return;
        }
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await res.json();
        setChosenUser(data);
        setIsLoading(false);
    }

    function openTableModal(id) {
        console.log(id);
        getUserById(id);
        setTableModalShow(true);
    }

    useEffect(() => {
        updateTableData(data);
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        setTableHeight(table.current?.offsetHeight);
    }, [tableData, isResizing]);

    if (tableData.length === 0) {
        return <p>Данные не найдены :(</p>;
    }

    return (
        <>
            <table className="table" ref={table}>
                <TableHead
                    setIsResizing={setIsResizing}
                    tableHeight={tableHeight}
                    columns={columns}
                    handleSorting={handleSorting}
                />
                <TableBody openTableModal={openTableModal} rows={tableData} />
            </table>
            <Modal
                isShow={tableModalShow}
                setIsShow={setTableModalShow}
                modalTitle="Информация о пользователе"
            >
                {isLoading ? <p>Загрузка...</p> : <UserInfo user={chosenUser} />}
            </Modal>
        </>
    );
}
