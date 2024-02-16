import "./modal.css";

/**
 * @param {boolean} isShow - отображать модальное окно или нет
 * @param {function} setIsShow - функция задания отображения модального окна
 * @param {string} modalTitle - заголовок модального окна
 * @param {ReactNode} children - содержимое модального окна
 */
export default function Modal({ isShow, setIsShow, modalTitle, children }) {
    return isShow ? (
        <div className="overlay" onClick={() => setIsShow(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title">{modalTitle}</h3>
                <div className="modal__body">{children}</div>
                <button className="btn" onClick={() => setIsShow(false)}>
                    Закрыть
                </button>
            </div>
        </div>
    ) : null;
}
