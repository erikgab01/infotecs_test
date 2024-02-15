import { useState } from "react";
import Resizer from "../Resizer/Resizer";

export default function TableHead({ setIsResizing, tableHeight, columns, handleSorting }) {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState(0);
    const orderVariants = ["none", "asc", "desc"];

    function handleSortingChange(accessor) {
        const sortOrder = accessor === sortField ? (order + 1) % 3 : 1;
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, orderVariants[sortOrder]);
    }

    return (
        <thead className="table__head">
            <tr className="table__row">
                {columns.map(({ label, accessor, sortable, ref }) => {
                    const cl = sortable
                        ? sortField === accessor && orderVariants[order] === "asc"
                            ? "up"
                            : sortField === accessor && orderVariants[order] === "desc"
                            ? "down"
                            : "none"
                        : "";
                    return (
                        <th
                            ref={ref}
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={`table__header ${cl}`}
                        >
                            {label}
                            <Resizer
                                setIsResizing={setIsResizing}
                                tableHeight={tableHeight}
                                columnRef={ref}
                            />
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
