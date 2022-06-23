import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytesResumable } from '@firebase/storage';

const prod = '';
const dev = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: dev,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': dev,
    },
    withCredentials: true
})


export const registerUser = async (user) => {

    return await api.post('/signup', user).then((response) => response).catch((error) => {
        return error.response
    })
}

export const loginUser = async (user) => {

    return await api.post('/signin', user).then((response) => response).catch((error) => {
        return error.response
    })
}


export const refreshToken = async () => {

    return await api.get('/refresh_session').then((response) => response).catch((error) => {
        return error.response
    })
}

export const logoutUser = async () => {

    return await api.post('/logout').then((response) => response).catch((error) => {
        return error.response
    })
}

export const firebaseUploadImg = (file) => {
    const storageRef = ref(storage, `/files/logos/${file.name}_${new Date().getTime()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    return uploadTask
}

export const firebaseUploadVideo = (file) => {
    const storageRef = ref(storage, `/files/videos/${file.name}_${new Date().getTime()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    return uploadTask
}

export const updateUserFields = async (params) => {

    return await api.post('/update_user', params).then((response) => response).catch((error) => {
        return error.response
    })
}

export const mpesaPayment = async (data) => {
    return await api.post(`/payments/mpesa`, data).then((response) => response).catch((err) => {
            return err.response;
        });
};

export const mpesaConfirmPaid = async (data) => {
    return await api.post(`/payments/mpesa/verify`, data).then((response) => response).catch((err) => {
        return err.response;
      });
  };
  