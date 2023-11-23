// sessionStorageUtil.js

export const saveUserToSessionStorage = (resp) => {
    sessionStorage.setItem('rexkod_user_id', resp.user.id);
    sessionStorage.setItem('rexkod_user_type', resp.user.type);
    sessionStorage.setItem('rexkod_user', JSON.stringify(resp));
};

export const getUserFromSessionStorage = () => {
    const userString = sessionStorage.getItem("rexkod_user");
    return JSON.parse(userString);
};

export const clearSessionStorage = () => {
    sessionStorage.removeItem("rexkod_user");
};
