import { useRef, useState } from "react";
import "./resizer.css";

export default function Resizer({ setIsResizing, tableHeight, columnRef }) {
    const [isActive, setIsActive] = useState(false);
    const mouseX = useRef(0);
    const width = useRef(0);

    const minColumnWidth = 50;

    function handleMouseDown(e) {
        const col = columnRef.current;
        const styles = window.getComputedStyle(col);
        mouseX.current = e.clientX;
        width.current = parseInt(styles.width, 10);

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        setIsActive(true);
        setIsResizing(true);
    }

    function mouseMoveHandler(e) {
        const col = columnRef.current;
        const dx = e.clientX - mouseX.current;
        if (width.current + dx < minColumnWidth) {
            return;
        }
        col.style.width = `${width.current + dx}px`;
    }

    function mouseUpHandler() {
        setIsActive(false);
        setIsResizing(false);
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
            className={`resizer ${isActive ? "resizing" : ""}`}
            style={{ height: tableHeight }}
        ></div>
    );
}
