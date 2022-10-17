import axios from "axios";
import {
  registerStart,
  registerSuccess,
  registerFail,
  loginStart,
  loginFail,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFail,
} from "../store/slices/authReducer";
import {
  setBooksPending,
  setBooksSucceeded,
} from "../store/slices/libraryReducer";
import cartReducer from "../store/slices/cartReducer";
const API = "https://giahui-library.herokuapp.com";
// const API = "http://localhost:5000";
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`${API}/v1/auth/register`, user);
    dispatch(registerSuccess());
    await loginUser(user, dispatch, navigate);
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(registerFail(error.response.data._message));
  }
};
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API}/v1/auth/login`, user);
    const { refreshToken, ...data } = res.data;
    console.log(refreshToken, data);
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(loginSuccess(data));
    navigate("/");
  } catch (error) {
    console.log(error.response.data);
    dispatch(loginFail(error.response.data));
  }
};

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT) => {
  try {
    dispatch(logoutStart());
    const refreshToken = localStorage.getItem("refreshToken");
    await axiosJWT.post(`${API}/v1/auth/logout`, { refreshToken });
    localStorage.removeItem("refreshToken");
    dispatch(logoutSuccess());
    dispatch(cartReducer.actions.clearCart());

    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(logoutFail());
  }
};
export const getAllBooks = async (setBooks, dispatch) => {
  dispatch(setBooksPending());
  let res = await axios.get(`${API}/v1/books`);
  dispatch(setBooksSucceeded([...res.data]));
  setBooks([...res.data]);
};
export const addBook = async (book, axiosJWT, accessToken) => {
  try {
    await axiosJWT.post(`${API}/v1/books/addbook`, book);
  } catch (error) {
    console.log(error);
  }
};
export const deleteBook = async (bookID, axiosJWT, accessToken) => {
  try {
    await axiosJWT.delete(`${API}/v1/books/deletebook/${bookID}`);
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (
  setOrders,
  accessToken,
  axiosJWT,
  completed
) => {
  console.log(accessToken);
  try {
    const res = await axiosJWT.get(`${API}/v1/orders/getallorders`, {
      params: { completed },
    });
    console.log(res.data);
    setOrders([...res.data]);
  } catch (error) {
    console.log(error);
  }
};

export const getBooksFromOrderDetails = async (
  orderID,
  accessToken,
  axiosJWT,
  setBooks
) => {
  try {
    const res = await axiosJWT.get(`${API}/v1/orders/booksfromorder`, orderID);
    setBooks([...res.data]);
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = async (order, accessToken, axiosJWT) => {
  try {
    console.log(order);
    await axiosJWT.post(`${API}/v1/orders/addorder`, order);
  } catch (error) {
    console.log(error);
  }
};

export const completeOrder = async (order, accessToken, axiosJWT) => {
  try {
    console.log(order);
    await axiosJWT.put(`${API}/v1/orders/${order._id}`);
  } catch (error) {
    console.log(error);
  }
};
