import { useState } from "react";

/**
 * Хук для сортировки данных
 *
 * @param {object[]} data - массив объектов для сортировки
 * @returns {object[]} отсортированный массив объектов
 */
export default function useSort(data) {
    const [tableData, setTableData] = useState(data);

    /**
     * Функция сортировки по полю и методу
     *
     * @param {string} sortField - поле для сортировки
     * @param {string} sortOrder - метод сортировки (по возрастанию, по убыванию, без сортировки)
     */
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

    /**
     * Функция для обновления данных внутри хука
     */
    function updateTableData(data) {
        setTableData(data);
    }

    return [tableData, updateTableData, handleSorting];
}
