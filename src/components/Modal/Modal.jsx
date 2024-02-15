import "./modal.css";

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
