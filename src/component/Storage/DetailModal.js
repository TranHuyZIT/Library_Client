import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { Fade, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { createAxios } from "../../createInstance";
import { userSelector } from "../../store/selectors";
import { addOrder, getBookGenres, updateBook } from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import cartReducer from "../../store/slices/cartReducer";
import { InputLabel, Select } from "@material-ui/core";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function DetailModal({ open, setOpenDetailModal, book }) {
  const [value, setValue] = useState(0);
  const [updatedBook, setUpdatedBook] = useState(book);
  const [bookGenres, setBookGenres] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const name = book?.name;
  const author = book?.author;
  const price = book?.price;
  const description = book?.description;
  const img = book?.img;
  const number = book?.number;
  const genre = book?.genre;

  useEffect(() => {
    getBookGenres(setBookGenres);
  }, []);

  const handleSell = () => {
    if (!currentUser) navigate("/login");
    if (!currentUser?.admin) {
      dispatch(cartReducer.actions.addToCart({ book, rating: value }));
    } else {
      console.log(updatedBook);
      updateBook(book._id, updatedBook, axiosJWT, currentUser?.accessToken);
    }
    setOpenDetailModal(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpenDetailModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign: "center",
                padding: " 12px 8px",
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: "4px",
              }}
              variant="h6"
              component="h6"
            >
              Thông Tin Chi tiết
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Fade in={true}>
              <img style={{ width: "100%" }} src={`${img}`} alt="error occur" />
            </Fade>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Tên
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "4px" }}
                    onChange={(e) => {
                      setUpdatedBook({ ...updatedBook, name: e.target.value });
                    }}
                    defaultValue={name}
                  />
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {name}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Tác Giả
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "4px" }}
                    onChange={(e) => {
                      setUpdatedBook({
                        ...updatedBook,
                        author: e.target.value,
                      });
                    }}
                    defaultValue={author}
                  />
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {author}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Giá
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "4px" }}
                    onChange={(e) => {
                      setUpdatedBook({
                        ...updatedBook,
                        price: +e.target.value,
                      });
                    }}
                    defaultValue={price}
                  />
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {price}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Số lượng
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "4px" }}
                    onChange={(e) => {
                      setUpdatedBook({
                        ...updatedBook,
                        number: +e.target.value,
                      });
                    }}
                    defaultValue={number}
                  />
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {number}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Mô tả
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: "4px" }}
                    onChange={(e) => {
                      setUpdatedBook({
                        ...updatedBook,
                        description: e.target.value,
                      });
                    }}
                    defaultValue={description}
                  />
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {description}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Thể loại
                </Typography>
              </Grid>
              <Grid item xs={9} sx={{ boxSizing: "border-box" }}>
                {currentUser?.admin ? (
                  <FormControl fullWidth>
                    <InputLabel>Thể loại</InputLabel>
                    <Select
                      value={updatedBook?.genre}
                      onChange={(e) => {
                        setUpdatedBook({
                          ...updatedBook,
                          genre: e.target.value,
                        });
                      }}
                      label="Thể loại"
                    >
                      {bookGenres.map((genre, index) => {
                        return (
                          <MenuItem key={`genre${index}`} value={genre.name}>
                            {genre.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                    {genre}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {currentUser?.admin ? (
              <></>
            ) : (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontWeight: 600, color: "secondary.main" }}
                  >
                    Đánh Giá
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Rating
                    name="simple-controlled"
                    precision={1}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid container spacing={1} alignItems="center">
              <Grid
                sx={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                item
                xs={12}
              >
                <Button onClick={handleSell} variant="contained">
                  {currentUser?.admin ? "Lưu" : "Thêm"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
