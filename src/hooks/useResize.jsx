import { useRef, useState } from "react";

/**
 * Хук для изменения размеров элемента
 *
 * @param {function} onMouseUp - функция, вызываемая при событии mouseUp
 * @param {function} onMouseMove - функция, вызываемая при событии mouseMove
 * @param {number} elementMinWidth - минимальная ширина элемента
 * @returns {[boolean, function]} - первый элемент — это логическое значение, указывающее, изменяется ли размер элемента, второй элемент — это функция для изменения размера
 */
export default function useResize(onMouseUp = null, onMouseMove = null, elementMinWidth = 50) {
    const [isResizing, setIsResizing] = useState(false);
    const mouseX = useRef(0);
    const width = useRef(0);
    const elementRef = useRef(null);

    /**
     * Функция для изменения размера элемента
     * @param {Event} e - событие мыши
     * @param {React.RefObject} ref - ref на растягиваемый элемент
     */
    function handleResize(e, ref) {
        elementRef.current = ref.current;
        const element = elementRef.current;
        const styles = window.getComputedStyle(element);
        mouseX.current = e.clientX;
        width.current = parseInt(styles.width, 10);
        setIsResizing(true);

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    }

    /**
     * Обработчик события мыши mouseMove
     */
    function mouseMoveHandler(e) {
        if (onMouseMove) {
            onMouseMove();
        }
        const element = elementRef.current;
        const dx = e.clientX - mouseX.current;
        if (width.current + dx < elementMinWidth) {
            return;
        }
        element.style.width = `${width.current + dx}px`;
    }

    /**
     * Обработчик события мыши mouseUp
     */
    function mouseUpHandler() {
        if (onMouseUp) {
            onMouseUp();
        }
        setIsResizing(false);
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }

    return [isResizing, handleResize];
}
