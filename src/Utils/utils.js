export const isEmailValid = (email) => {
    //let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;  //Coach'd Expression
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const checkUserLoginStatus = () =>{
    let userData = localStorage.getItem('userData');
    if(userData === null){
        return false;
    }else{
        return true;
    }
}

export const getLoggedInUserId = () => {
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return userData.id;
}