import { createStore, applyMiddleware } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import axios from "axios";

export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

export const addUserSuccess = (user) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: user,
  };
};

export const addUserFailure = (err) => {
  return {
    type: ADD_USER_FAILURE,
    payload: err,
  };
};

export const removeUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};

export const removeUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id,
  };
};
export const removeUserFailure = (err) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: err,
  };
};

export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserFailure = (err) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: err,
  };
};

const initialState = {
  isLoading: false,
  users: [],
};

export const userReducer = function (state = initialState, action) {
  console.log(action.type);
  let idx;
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        users: action.error,
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        isLoading: false,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_USER_SUCCESS:
      idx = state.users.findIndex((user) => user.id == action.payload);
      state = { ...state };
      state.users = [...state.users];
      if (idx >= 0) state.users.splice(idx, 1);
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      console.log(action);
      idx = state.users.findIndex((user) => user.id == action.payload.id);
      state = { ...state };
      state.users = [...state.users];
      if (idx >= 0) state.users.splice(idx, 1, action.payload);
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
  }
  return { ...state };
};

export const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get(BASE_URL)
      .then((res) => {
        const users = res.data;
        console.log(users);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

export const addUser = (userData) => {
  return function (dispatch) {
    dispatch(addUserRequest());
    axios
      .post(BASE_URL, { ...userData })
      .then((res) => {
        console.log(res);
        dispatch(addUserSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(addUserFailure(err));
      });
  };
};

export const removeUser = (id) => {
  return function (dispatch) {
    dispatch(removeUserRequest());
    axios
      .delete(`${BASE_URL}/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(removeUserSuccess(id));
      })
      .catch((err) => {
        removeUserFailure(err);
      });
  };
};

export const updateUser = (userData) => {
  return function (dispatch) {
    dispatch(updateUserRequest());
    axios
      .patch(`${BASE_URL}/${userData.id}`, { ...userData })
      .then((res) => {
        const user = res.data;
        console.log(user);
        dispatch(updateUserSuccess(user));
      })
      .catch((err) => {
        dispatch(updateUserFailure(err));
      });
  };
};

export const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
