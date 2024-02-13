import { useEffect } from "react";
import useSort from "./hooks/useSort";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default function Table({ data, columns }) {
    const [tableData, updateTableData, handleSorting] = useSort(data);

    useEffect(() => {
        updateTableData(data);
    }, [data]);

    return tableData.length !== 0 ? (
        <table>
            <TableHead columns={columns} handleSorting={handleSorting} />
            <TableBody rows={tableData} />
        </table>
    ) : (
        <p>Данные не найдены :(</p>
    );
}
