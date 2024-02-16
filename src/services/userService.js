// Здесь находятся все API запросы, связанные с пользователями
// Более подробно про API и формат данных смотреть здесь: https://dummyjson.com/docs/users

/**
 * Функция для получения пользователя по идентификатору
 *
 * @param {number} userId - идентификатор пользователя
 * @returns {object} данные пользователя, или null если пользователь не найден или произошла ошибка
 */
async function fetchUserById(userId) {
    if (!userId) {
        return null;
    }
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const user = await response.json();
        if (user.message) {
            throw new Error(user.message);
        }
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Функция для получения всех пользователей
 *
 * @returns {object[]} массив объектов пользователей, или null если произошла ошибка.
 */
async function fetchAllUsers() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const users = await response.json();
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Функция для фильтрации пользователей по полю и поисковому запросу
 *
 * @param {string} key - поле, по которому фильтровать
 * @param {string} value - поисковый запрос
 * @returns {object[]} массив объектов пользователей, или null если произошла ошибка.
 */
async function fetchFilteredUsers(key, value) {
    if (!value) {
        const users = await fetchAllUsers();
        return users;
    }
    try {
        const response = await fetch(
            `https://dummyjson.com/users/filter?key=${key}&value=${value}`
        );
        const users = await response.json();
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { fetchUserById, fetchAllUsers, fetchFilteredUsers };
