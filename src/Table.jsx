import { useEffect, useRef, useState } from "react";
import useSort from "./hooks/useSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableModal from "./TableModal";

export default function Table({ data, columns }) {
    const [tableHeight, setTableHeight] = useState("auto");
    const [tableData, updateTableData, handleSorting] = useSort(data);
    const [isResizing, setIsResizing] = useState(false);
    const [tableModalShow, setTableModalShow] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);
    const table = useRef(null);

    function openTableModal(id) {
        console.log(id);
        setChosenUser(id);
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
            <table ref={table}>
                <TableHead
                    setIsResizing={setIsResizing}
                    tableHeight={tableHeight}
                    columns={columns}
                    handleSorting={handleSorting}
                />
                <TableBody openTableModal={openTableModal} rows={tableData} />
            </table>
            <TableModal isShow={tableModalShow} setIsShow={setTableModalShow} userId={chosenUser} />
        </>
    );
}
