async function fetchUserById(userId) {
    if (!userId) {
        return null;
    }
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const user = await response.json();
    return user;
}

async function fetchAllUsers() {
    const response = await fetch("https://dummyjson.com/users");
    const users = await response.json();
    return users;
}

async function fetchFilteredUsers(key, value) {
    if (!value) {
        const users = await fetchAllUsers();
        return users;
    }
    const response = await fetch(`https://dummyjson.com/users/filter?key=${key}&value=${value}`);
    const users = await response.json();
    return users;
}

export { fetchUserById, fetchAllUsers, fetchFilteredUsers };
