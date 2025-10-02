/**
 * !!! A UTILS VALIDATION TO CHECK EMAIL IS VALID OR NOT
 */

export const isEmailValid = (email) => {
    //let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;  //Coach'd Expression
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * !!! A UTILS VALIDATION TO CHECK USER LOGIN STATUS
 */

export const checkUserLoginStatus = () => {
    let loggedInStatus = localStorage.getItem('isLoggedIn');
    return loggedInStatus === 'true';
}

/**
 * !!! A UTILS VALIDATION TO GET USERID
 */

export const getLoggedInUserId = () => {
    let userId = localStorage.getItem('userId');
    userId = JSON.parse(userId);
    return userId;
}

/**
 * !!! A UTILS VALIDATION TO GET JWT TOKEN
 */

export const getJWTToken = () => {
    return localStorage.getItem('access_token');
}

/**
 * !!! A UTILS VALIDATION TO CHECK USER SESSION IS VALID OR NOT
 */

export const invalidSession = () => {
    return setTimeout(() => {
        localStorage.clear();
        window.location.href = '/signin';
    }, 3000);
}

/**
 * !!! A UTILS VALIDATION TO CHECK USER ORDER STATUS
 */

export const orderSuccessSession = () => {
    return setTimeout(() => {
        window.location.href = '/product-search';
    }, 3000);
}