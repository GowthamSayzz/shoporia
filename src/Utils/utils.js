export const isEmailValid = (email) => {
    //let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;  //Coach'd Expression
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const checkUserLoginStatus = () => {
    let loggedInStatus = localStorage.getItem('isLoggedIn');
    return loggedInStatus === 'true';
}

export const getLoggedInUserId = () => {
    let userId = localStorage.getItem('userId');
    userId = JSON.parse(userId);
    return userId;
}

export const getLoggedInUserName = () => {
    let userData = localStorage.getItem('userName');
    userData = JSON.parse(userData);
    return userData.name;
}

export const getLoggedInEmail = () => {
    let userData = localStorage.getItem('userEmail');
    userData = JSON.parse(userData);
    return userData.email;
}

export const getJWTToken = () => {
    return localStorage.getItem('access_token');
}

export const invalidSession = () => {
    return setTimeout(() => {
        localStorage.clear();
        window.location.href = '/signin';
    }, 3000);
}

export const orderSuccessSession = () => {
    return setTimeout(() => {
        window.location.href = '/product-search';
    }, 3000);
}