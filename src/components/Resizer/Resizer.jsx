import { useEffect } from "react";
import useResize from "../../hooks/useResize";

import "./resizer.css";

export default function Resizer({ updateTableHeight, tableHeight, columnRef }) {
    const [isResizing, handleResize] = useResize();

    useEffect(() => {
        updateTableHeight();
        // eslint-disable-next-line
    }, [isResizing]);

    return (
        <div
            onMouseDown={(e) => handleResize(e, columnRef)}
            onClick={(e) => e.stopPropagation()}
            className={`resizer ${isResizing ? "resizing" : ""}`}
            style={{ height: tableHeight }}
        ></div>
    );
}
