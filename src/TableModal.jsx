import { useEffect, useState } from "react";
import "./modal.css";

export default function TableModal({ isShow, setIsShow, userId }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function getUserById() {
        if (!userId) {
            return;
        }
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await res.json();
        setUser(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserById();
        // eslint-disable-next-line
    }, [userId]);

    return isShow ? (
        <div className="overlay" onClick={() => setIsShow(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title">Информация о пользователе</h3>
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : (
                    <div className="modal__body">
                        <span>
                            ФИО: {user.lastName + " " + user.firstName + " " + user.maidenName}
                        </span>
                        <span>Возраст: {user.age}</span>
                        <span>Адрес: {user.address.address + ", " + user.address.city}</span>
                        <span>Рост: {user.height}</span>
                        <span>Вес: {user.weight}</span>
                        <span>Номер телефона: {user.phone}</span>
                        <span>Email: {user.email}</span>
                    </div>
                )}

                <button className="btn" onClick={() => setIsShow(false)}>
                    Закрыть
                </button>
            </div>
        </div>
    ) : null;
}
