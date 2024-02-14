import { useEffect, useRef, useState } from "react";
import useSort from "./hooks/useSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Table({ data, columns }) {
    const [tableHeight, setTableHeight] = useState("auto");
    const [tableData, updateTableData, handleSorting] = useSort(data);
    const [isResizing, setIsResizing] = useState(false);
    const table = useRef(null);

    useEffect(() => {
        updateTableData(data);
    }, [data]);

    useEffect(() => {
        setTableHeight(table.current?.offsetHeight);
    }, [tableData, isResizing]);

    if (tableData.length === 0) {
        return <p>Данные не найдены :(</p>;
    }

    return (
        <table ref={table}>
            <TableHead
                setIsResizing={setIsResizing}
                tableHeight={tableHeight}
                columns={columns}
                handleSorting={handleSorting}
            />
            <TableBody rows={tableData} />
        </table>
    );
}
