import { Button, Grid, Paper, Typography, Zoom } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { librarySelector, userSelector } from "../../store/selectors";
import { getAllOrders } from "../../utils/apiRequest";
import NavBar from "../AppBar/AppBar";
import ConfirmModal from "../Modal/ConfirmModal";

export default function Members() {
  const currentUser = useSelector(userSelector);
  const allBooks = useSelector(librarySelector).books;
  const axiosJWT = createAxios(currentUser);
  const [orders, setOrders] = useState([]);
  const [bookNames, setBookNames] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState(null);

  const completeOrderClick = (order) => {
    setOpenConfirm(true);
    setSelected(order);
  };
  useEffect(() => {
    const completed = false;
    getAllOrders(setOrders, currentUser?.accessToken, axiosJWT, completed);
  }, []);
  useEffect(() => {
    if (allBooks.length > 0 && orders.length > 0) {
      for (let order of orders) {
        console.log(order);
        let string = "";
        for (let book of order.books) {
          console.log(book);
          const bookInStorage = allBooks.find((bookStorage) => {
            return bookStorage._id == book.bookID;
          });
          string += bookInStorage.name + ", ";
        }
        string = string.slice(0, string.length - 2);

        setBookNames((current) => [...current, string]);
      }
    }
  }, [orders, allBooks]);
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item xs={11}>
        <Paper sx={{ padding: "16px" }} elevation={5}>
          <Grid container spacing={2}>
            {orders &&
              orders.map((order, index) => {
                return (
                  <Grid key={order._id} item xs={12} sm={6} md={3}>
                    <Zoom
                      in={true}
                      style={{
                        transitionDelay: (index !== 0 ? true : false)
                          ? "100ms"
                          : "0ms",
                      }}
                    >
                      <Card
                        sx={{
                          maxWidth: 345,
                          "&:hover": {
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                            transform: "scale(1.1)",
                            transition: "all linear 0.1s",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt="can not load image"
                          height="140"
                          image="/1.png"
                        />
                        <CardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontWeight: "700",
                                color: "secondary.main",
                              }}
                              component="div"
                            >
                              Tên Người Dùng:
                            </Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{
                                fontSize: "16px",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontWeight: "400",
                                marginLeft: "4px",
                              }}
                            >
                              {order.userName}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontWeight: "700",
                                color: "secondary.main",
                              }}
                              component="div"
                            >
                              Tổng Tiền:
                            </Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{
                                fontSize: "16px",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontWeight: "400",
                                marginLeft: "4px",
                              }}
                            >
                              {order.totalPrice}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontWeight: "700",
                                color: "secondary.main",
                              }}
                              component="div"
                            >
                              Đơn Hàng:
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "400",
                                marginLeft: "4px",
                                textAlign: "center",
                              }}
                            >
                              {bookNames[index]}
                            </p>
                          </div>
                        </CardContent>
                        <CardActions
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Button
                            onClick={() => {
                              completeOrderClick(order);
                            }}
                            variant="contained"
                          >
                            Đã Hoàn Thành
                          </Button>
                        </CardActions>
                      </Card>
                    </Zoom>
                  </Grid>
                );
              })}
          </Grid>
        </Paper>
      </Grid>
      {openConfirm && (
        <ConfirmModal
          open={openConfirm}
          setOpenConfirmModal={setOpenConfirm}
          order={selected}
        />
      )}
    </Grid>
  );
}
