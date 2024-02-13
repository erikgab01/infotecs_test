import { useState } from "react";

export default function useSort(data) {
    const [tableData, setTableData] = useState(data);

    function handleSorting(sortField, sortOrder) {
        if (sortField && sortOrder !== "none") {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        } else {
            setTableData(data);
        }
    }

    function updateTableData(data) {
        setTableData(data);
    }

    return [tableData, updateTableData, handleSorting];
}
