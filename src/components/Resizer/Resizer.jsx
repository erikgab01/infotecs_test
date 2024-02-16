import { useEffect } from "react";
import useResize from "../../hooks/useResize";

import "./resizer.css";

/**
 * Компонент, используемый для растягивания элемента
 *
 * @param {function} updateTableHeight - функция обновления высоты таблицы (или родительского контейнера элемента)
 * @param {number} tableHeight - текущая высота размера таблицы (или родительского контейнера элемента)
 * @param {object} columnRef - ref на растягиваемый элемент
 */
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
