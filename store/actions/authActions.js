import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./types";

import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://coffee.q8fawazo.me/api/"
});

const setAuthToken = token => {
  if (token) {
    // alert(token);
    let promise = AsyncStorage.setItem("token", token);
    promise
      .then(
        () => (axios.defaults.headers.common.Authorization = `jwt ${token}`)
      )
      .catch(err => alert(err));
  } else {
    AsyncStorage.removeItem("token")
      .then(() => {
        delete axios.defaults.headers.common.Authorization;
        alert("here");
      })
      .catch(err => alert(err));
  }
};

export const checkForExpiredToken = () => {
  return dispatch => {
    AsyncStorage.getItem("token").then(token => {
      if (token) {
        // const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        //alert(user.username);

        //if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
        //}
      } else {
        alert("no token");
      }
    });
  };
};

export const login = (userData, navigation) => {
  return dispatch => {
    instance
      .post("login/", userData)
      .then(res => {
        alert("logged");
        return res.data;
      })
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        return decodedUser;
      })
      .then(decodedUser => dispatch(setCurrentUser(decodedUser)))

      .then(() => dispatch(navigation.replace("CoffeeList")))
      .catch(err => dispatch(setErrors(err.response.data)));
  };
};

export const signup = (userData, navigation) => {
  return dispatch => {
    instance
      .post("register/", userData)
      .then(res => res.data)
      .then(user => {
        alert("user signed up");
        dispatch(login(userData, navigation));
      })
      .catch(err => dispatch(setErrors(err.response.data)));
  };
};

export const logout = () => {
  setAuthToken();
  return {
    type: actionTypes.LOGOUT_USER
  };
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

export const setErrors = errors => {
  return { type: SET_ERROR, payload: errors };
};
