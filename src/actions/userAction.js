import { LOGIN_SUCCESS, LOGIN_REQUEST, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_SUCCESS } from "../constants/userConstants";
import axios from "../apiConfig/api";

export const registeruser = (userData, navigate, fun) => async () => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post("/register", userData, config);
        if (res.status == 201) {
            navigate("/login");
        } else {
            window.alert("somthing went wrong");
        }

        fun(null);

    } catch (error) {
        fun(error.response.data.message)
        console.log(error);
    }
}

export const loginUser = (userData, fun) => async (dispatch) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post("/login", userData, config);
        if (res.status == 200) {
            localStorage.setItem("userToken", res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
        } else {
            window.alert("somthing went wrong");
        }

        fun(null);

    } catch (error) {
        fun(error.response.data.message);
        console.log(error);
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("userToken");
        if (token) {
            const config = { headers: { "Content-Type": "application/json" } };
            const res = await axios.post("/get_user_data", { token }, config);
            dispatch({ type: LOAD_SUCCESS, payload: res.data.user });
        } else {
            console.log("token is not present..!");
        }
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = (navigate) => async (dispatch) => {
    try {
        localStorage.removeItem("userToken");
        dispatch({ type: LOGOUT_SUCCESS });
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
}

