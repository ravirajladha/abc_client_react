// sessionStorageUtil.js
//old code, where ashutosh was using saveUserToSessionStorage, due to which we i was not able to open any tab in new page
// the , i used saveUserToLocalStorage instead through which it was happening. to revert back, u need to search the whole project, and replace accodringly

// export const saveUserToSessionStorage = (resp) => {
//     sessionStorage.setItem('rexkod_user_id', resp.user.id);
//     sessionStorage.setItem('rexkod_user_type', resp.user.type);
//     sessionStorage.setItem('rexkod_user', JSON.stringify(resp));
// };

// export const getUserFromSessionStorage = () => {
//     const userString = sessionStorage.getItem("rexkod_user");
//     return JSON.parse(userString);
// };

// export const clearSessionStorage = () => {
//     sessionStorage.removeItem("rexkod_user");
// };


export const saveUserToLocalStorage = (resp) => {
    localStorage.setItem('rexkod_user_id', resp.user.id);
    localStorage.setItem('rexkod_user_type', resp.user.type);
    localStorage.setItem('rexkod_user', JSON.stringify(resp));
};

export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("rexkod_user");
    return JSON.parse(userString);
};

export const clearLocalStorage = () => {
    localStorage.removeItem("rexkod_user");
};

