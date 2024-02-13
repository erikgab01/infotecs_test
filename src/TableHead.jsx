import { useState } from "react";

export default function TableHead({ columns, handleSorting }) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState(0);
    const orderVariants = ["none", "asc", "desc"];

    const handleSortingChange = (accessor) => {
        const sortOrder = accessor === sortField ? (order + 1) % 3 : 1;
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, orderVariants[sortOrder]);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField === accessor && orderVariants[order] === "asc"
                            ? "up"
                            : sortField === accessor && orderVariants[order] === "desc"
                            ? "down"
                            : "none"
                        : "";
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
