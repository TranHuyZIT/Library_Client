import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { Fade, Grid } from "@mui/material";
import { createAxios } from "../../createInstance";
import { userSelector } from "../../store/selectors";
import { addOrder } from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import cartReducer from "../../store/slices/cartReducer";
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
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(userSelector);
  const name = book.name;
  const author = book.author;
  const price = book.price;
  const description = book.description;
  const img = book.img;
  const number = book.number;

  const handleSell = () => {
    if (currentUser) {
      dispatch(cartReducer.actions.addToCart({ book, rating: value }));
    } else {
      navigate("/login");
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
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Tên
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subheading" sx={{ fontWeight: 300 }}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Tác Giả
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subheading1" sx={{ fontWeight: 300 }}>
                  {author}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Giá
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subheading1" sx={{ fontWeight: 300 }}>
                  {price}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Số lượng
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subheading1" sx={{ fontWeight: 300 }}>
                  {number}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: 600, color: "secondary.main" }}
                >
                  Mô tả
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="subheading1"
                  sx={{
                    fontWeight: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {description}
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontWeight: 600, color: "secondary.main" }}
                  >
                    Đánh Giá
                  </Typography>
                </Grid>
                <Grid item xs={8}>
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

              <Grid container spacing={1}>
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
                    Thêm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
