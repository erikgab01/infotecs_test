import { useEffect, useRef, useState } from "react";
import { fetchUserById } from "../../services/userService";
import useSort from "../../hooks/useSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Modal from "../Modal/Modal";
import UserInfo from "./UserInfo";

import "./table.css";

export default function Table({ data, columns }) {
    const [tableHeight, setTableHeight] = useState("auto");
    const [tableData, updateTableData, handleSorting] = useSort(data);
    const [tableModalShow, setTableModalShow] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const table = useRef(null);

    async function openTableModal(id) {
        setTableModalShow(true);
        setIsLoading(true);
        const user = await fetchUserById(id);
        if (!user) {
            // Error handling
            setIsLoading(false);
            return;
        }
        setChosenUser(user);
        setIsLoading(false);
    }

    function updateTableHeight() {
        setTableHeight(table.current?.offsetHeight);
    }

    useEffect(() => {
        updateTableData(data);
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        updateTableHeight();
    }, [tableData]);

    if (tableData.length === 0) {
        return <p>Данные не найдены :(</p>;
    }

    return (
        <>
            <table className="table" ref={table}>
                <TableHead
                    updateTableHeight={updateTableHeight}
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
