import { useRef, useState } from "react";

export default function useResize(onMouseUp = null, onMouseMove = null, elementMinWidth = 50) {
    const [isResizing, setIsResizing] = useState(false);
    const mouseX = useRef(0);
    const width = useRef(0);
    const elementRef = useRef(null);

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
