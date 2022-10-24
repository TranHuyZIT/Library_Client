import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import CircularProgress from "@mui/material/CircularProgress";

import {
  cartSelector,
  librarySelector,
  userSelector,
} from "../../../store/selectors";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import useDelay from "../../../hooks/useDelay";
import searchBook from "../../../utils/searchBook";
import "./orderDetail.css";
import cartReducer from "../../../store/slices/cartReducer";
import { addOrder as saveOrder } from "../../../utils/apiRequest";
import { createAxios } from "../../../createInstance";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: "8px",
};

export default function OrderDetailForm({ setOpen }) {
  const [tab, setTab] = useState("userInfo");
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();
  const cart = useSelector(cartSelector);
  const [result, setResult] = useState([]);
  const [text, setText] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [numberDetail, setNumberDetail] = useState({});

  const deliverInfoRef = useRef({ name: "", phone: "", address: "" });
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const books = useSelector(librarySelector).books;
  const dispatch = useDispatch();
  const delayedText = useDelay(text);

  const submitAndSave = () => {
    if (currentUser) {
      // Enter New Order Step 3
      let price = 0,
        rating = 0;
      cart.forEach((cartItem) => {
        price += cartItem.price;
        rating += cartItem.rating;
      });
      rating /= cart.length;
      console.log(deliverInfoRef.current, numberDetail);
      const newOrder = {
        userID: currentUser._id,
        books: [...cart],
        fullName: deliverInfoRef.current.name,
        phone: deliverInfoRef.current.phone,
        address: deliverInfoRef.current.address,
        totalPrice: price,
        rating,
        number: { ...numberDetail },
      };
      // Enter New Order Step 4
      saveOrder(newOrder, currentUser.accessToken, axiosJWT, setLoading);
      dispatch(cartReducer.actions.clearCart());
      setOpen(false);
    } else {
      navigate("/login");
    }
  };

  const handleNext = () => {
    // Validation
    const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let errorCheck = { name: "", phone: "", address: "" };
    if (!nameRef.current.value) {
      errorCheck.name = "Name is required.";
    }
    if (!phoneRegex.test(phoneRef.current.value)) {
      errorCheck.phone = "Ivalid phone number";
    }
    if (phoneRef.current.value.length < 10) {
      errorCheck.phone = "Phone Number has to be a least 10 digits.";
    }
    if (!phoneRef.current.value) {
      errorCheck.phone = "Phone is required.";
    }
    if (!addressRef.current.value) {
      errorCheck.address = "Address is required.";
    }
    setError({ ...errorCheck });
    if (!errorCheck.name && !errorCheck.phone && !errorCheck.address) {
      deliverInfoRef.current = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
      };
      setTab("orderInfo");
    }
  };

  const removeCart = (id) => {
    dispatch(cartReducer.actions.removeFromCart(id));
  };
  const addCart = (book) => {
    dispatch(cartReducer.actions.addToCart({ book, rating: 5, number: 0 }));
    setText("");
  };

  useEffect(() => {
    setResult([...searchBook(books, delayedText, setResult)]);
    if (delayedText !== "") setOpenResult(true);
  }, [delayedText]);

  return (
    <Modal
      open={true}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        transition: "all 0.5s ease-in",
        border: "none",
      }}
    >
      <Box sx={style}>
        <Typography
          sx={{
            textAlign: "center",
            padding: " 12px 8px",
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "4px",
          }}
          id="modal-modal-title"
          variant="h4"
          component="h2"
        >
          Đặt Sách
        </Typography>
        {tab === "userInfo" && (
          <>
            <div>
              <TextField
                sx={{ marginTop: "10px" }}
                fullWidth
                label="Tên Người Đặt"
                id="fullWidth"
                defaultValue={currentUser.username}
                inputRef={nameRef}
                error={error.name}
                helperText={error.name}
                onFocus={() => {
                  setError({ ...error, name: "" });
                }}
              />
              <TextField
                sx={{ marginTop: "10px" }}
                fullWidth
                label="SĐT Người Đặt"
                id="fullWidth"
                inputRef={phoneRef}
                error={error.phone}
                helperText={error.phone}
                onFocus={() => {
                  setError({ ...error, phone: "" });
                }}
              />
              <TextField
                sx={{ marginTop: "10px" }}
                fullWidth
                label="Địa chỉ"
                id="fullWidth"
                inputRef={addressRef}
                error={error.address}
                helperText={error.address}
                onFocus={() => {
                  setError({ ...error, address: "" });
                }}
              />
            </div>
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleNext} variant="contained">
                Tiếp
              </Button>
            </Box>
          </>
        )}
        {tab === "orderInfo" && (
          <>
            <div>
              <Grid sx={{ marginTop: "10px" }} container spacing={2}>
                <Grid item xs={12} sx={{ position: "relative" }}>
                  <ClickAwayListener
                    onClickAway={() => {
                      setOpenResult(false);
                    }}
                  >
                    <Paper
                      elevation={5}
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Thêm sách vào giỏ"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                        onClick={() => {
                          setOpenResult(!openResult);
                        }}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </ClickAwayListener>
                  {openResult && result.length === 0 && (
                    <div className="message">Không có kết quả</div>
                  )}
                  {openResult && result.length > 0 && delayedText && (
                    <div className="result">
                      {result.map((book, index) => {
                        if (index <= 3)
                          return (
                            <div
                              onClick={() => {
                                addCart(book);
                              }}
                              className="resultItem"
                            >
                              <img style={{ height: "100%" }} src={book.img} />
                              <Typography
                                sx={{
                                  marginLeft: "8px",
                                  fontFamily: "Roboto",
                                }}
                                variant="h7"
                              >
                                {book.name}
                              </Typography>
                            </div>
                          );
                      })}
                    </div>
                  )}
                </Grid>
              </Grid>
              {cart.map((book, index) => (
                <Grid sx={{ marginTop: "10px" }} container spacing={2}>
                  <Grid item xs={10}>
                    <Paper
                      elevation={1}
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        style={{ width: "80px", left: "0" }}
                        src={book.img}
                      ></img>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                        disabled={true}
                      />

                      <Typography
                        sx={{ fontFamily: "Roboto", marginRight: "8px" }}
                      >
                        {book.name}
                      </Typography>
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                        onClick={() => {
                          removeCart(book._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", alignItems: "center" }}
                    item
                    xs={2}
                  >
                    <TextField
                      sx={{ width: "100%" }}
                      label="Số lượng"
                      variant="outlined"
                      onChange={(e) => {
                        setNumberDetail((prev) => {
                          const temp = { ...prev };
                          temp[book._id] = e.target.value;
                          return temp;
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </div>
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  setTab("userInfo");
                }}
                variant="contained"
              >
                Trước
              </Button>
              {loading === "idle" ? (
                <Button
                  sx={{ marginLeft: "8px" }}
                  onClick={submitAndSave}
                  variant="contained"
                >
                  Đặt
                </Button>
              ) : loading === "loading" ? (
                <CircularProgress />
              ) : (
                <div>Error</div>
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
