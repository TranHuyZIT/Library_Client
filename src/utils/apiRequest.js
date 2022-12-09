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
const API = "https://giahui-library-api.onrender.com";
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

export const getBookGenres = async (setBookGenres) => {
  try {
    const res = await axios.get(`${API}/v1/books/genres`);
    setBookGenres(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const addBook = async (
  book,
  axiosJWT,
  accessToken,
  setLoading = undefined
) => {
  try {
    if (setLoading) setLoading(true);
    await axiosJWT.post(`${API}/v1/books/addbook`, book);
    if (setLoading) setLoading(false);
  } catch (error) {
    console.log(error);
    if (setLoading) setLoading(false);
  }
};
export const deleteBook = async (bookID, axiosJWT, accessToken) => {
  try {
    await axiosJWT.delete(`${API}/v1/books/deletebook/${bookID}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (
  bookID,
  updatedBookInfo,
  axiosJWT,
  accessToken
) => {
  try {
    await axiosJWT.put(`${API}/v1/books/updatebook/${bookID}`, updatedBookInfo);
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
  try {
    const res = await axiosJWT.get(`${API}/v1/orders/getallorders`, {
      params: { completed },
    });
    setOrders([...res.data]);
  } catch (error) {
    console.log(error);
  }
};

export const getBooksFromOrderDetails = async (
  orderID,
  accessToken,
  axiosJWT,
  setBooks,
  setLoading
) => {
  try {
    setLoading("loading");
    console.log(orderID);
    const res = await axiosJWT.get(
      `${API}/v1/orders/booksfromorder/${orderID}`
    );
    setBooks([...res.data]);
    setLoading("idle");
  } catch (error) {
    console.log(error);
  }
};

// Enter New Order Step 5
export const addOrder = async (order, accessToken, axiosJWT, setLoading) => {
  try {
    setLoading("loading");
    await axiosJWT.post(`${API}/v1/orders/addorder`, order);
    setLoading("idle");
  } catch (error) {
    console.log(error);
  }
};

export const completeOrder = async (
  order,
  accessToken,
  axiosJWT,
  setLoading
) => {
  try {
    setLoading("loading");
    await axiosJWT.put(`${API}/v1/orders/${order._id}`);
    setLoading("idle");
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrderDetails = async (
  accessToken,
  axiosJWT,
  completed,
  setOrderDetails,
  setInfo,
  setLoading = undefined
) => {
  try {
    if (setLoading) setLoading(true);
    const { data } = await axiosJWT.get(`${API}/v1/orders/getallorders`, {
      params: { completed },
    });
    let result = [];
    let totalRating = 0,
      totalRater = data.length;
    for (let order of data) {
      const orderDetailsResponse = await axiosJWT.get(
        `${API}/v1/orders/booksfromorder/${order._id}`
      );
      totalRating += order.rating;
      orderDetailsResponse.data.forEach((detail) => {
        result.push(detail);
      });
    }
    setInfo((prev) => {
      return { ...prev, totalRating, totalRater };
    });
    setOrderDetails([...result]);
    if (setLoading) setLoading(false);
  } catch (error) {
    console.log(error);
    if (setLoading) setLoading(false);
  }
};
