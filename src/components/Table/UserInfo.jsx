export default function UserInfo({ user }) {
    return !user ? (
        <p>Произошла ошибка при загрузке пользователя</p>
    ) : (
        <>
            <span>ФИО: {user.lastName + " " + user.firstName + " " + user.maidenName}</span>
            <span>Возраст: {user.age}</span>
            <span>Адрес: {user.address.address + ", " + user.address.city}</span>
            <span>Рост: {user.height}</span>
            <span>Вес: {user.weight}</span>
            <span>Номер телефона: {user.phone}</span>
            <span>Email: {user.email}</span>
        </>
    );
}
