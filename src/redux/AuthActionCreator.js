import axios from 'axios';
import * as actTypes from './ActionType.js';

const AuthSuccess = (token, userId) => {
    return {
        type: actTypes.AUTHENTICATION_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

const authLoading = isLoading => {
    return {
        type: actTypes.AUTHENTICATION_LOADING,
        payload: isLoading
    }
}
const errMsg = msg => {
    return {
        type: actTypes.AUTHENTICATION_FAILED,
        payload: msg
    }
}
export const authenticate = (email, password, userMode) => dispatchEvent => {
    dispatchEvent(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let authType = null;
    authType = userMode === "Login" ? "signInWithPassword" : "signUp";
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${actTypes.API_KEY}`, authData)
        .then(response => {
            dispatchEvent(authLoading(false));
            if (response.status === 200) {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', email);
                let expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime);
                dispatchEvent(AuthSuccess(response.data.idToken, response.data.localId))
            } else {
                console.log("something went wrong. try again", response);
            }
        })
        .catch(error => {
            dispatchEvent(authLoading(false));
            console.log(error);
            dispatchEvent(errMsg(error.response.data.error.message))
        })
}

export const userLogout = () => {
    return {
        type: actTypes.AUTHENTICATION_LOGOUT,
    }
}

export const authLocalCheck = () => dispatchEvent => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatchEvent(userLogout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (!expirationTime || expirationTime <= new Date()) {
            dispatchEvent(userLogout());
        } else {
            const userId = localStorage.getItem('userId')
            dispatchEvent(AuthSuccess(token, userId));
        }
    }
}