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

async function fetchFilteredUsers(key, value) {
    try {
        if (!value) {
            const users = await fetchAllUsers();
            return users;
        }
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
