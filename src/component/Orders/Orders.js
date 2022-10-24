import { Button, Grid, Paper, Typography, Zoom } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { userSelector } from "../../store/selectors";
import { getAllOrders } from "../../utils/apiRequest";
import NavBar from "../AppBar/AppBar";
import ConfirmModal from "../Modal/ConfirmModal";
import OrderDetail from "./OrderDetail";
export default function Members() {
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const [orders, setOrders] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const openDetailOrder = (order, event) => {
    setSelected(order);
    setOpenDetail(true);
  };

  const completeOrderClick = (order) => {
    setSelected(order);
    setOpenConfirm(true);
  };
  useEffect(() => {
    const completed = false;
    getAllOrders(setOrders, currentUser?.accessToken, axiosJWT, completed);
  }, []);
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: "16px" }} elevation={5}>
          <Grid container spacing={2}>
            {orders &&
              orders.map((order, index) => {
                return (
                  <Grid key={order._id} item xs={12} sm={6} md={4} lg={3}>
                    <Zoom
                      in={true}
                      style={{
                        transitionDelay: (index !== 0 ? true : false)
                          ? "100ms"
                          : "0ms",
                      }}
                    >
                      <Card
                        onClick={(e) => {
                          openDetailOrder(order, e);
                        }}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          "&:hover": {
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                            transform: "scale(1.05)!important",
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
                                minWidth: "25%",
                              }}
                              component="div"
                            >
                              ID:
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
                              {order._id}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
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
                                WebkitLineClamp: 2,
                                fontWeight: "700",
                                color: "secondary.main",
                                minWidth: "25%",
                              }}
                              component="div"
                            >
                              SĐT:
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
                              {order.phoneNumber}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
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
                                minWidth: "25%",
                              }}
                              component="div"
                            >
                              Họ Tên:
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
                              {order.fullName}
                            </Typography>
                          </div>

                          <div
                            style={{
                              display: "flex",
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
                                minWidth: "25%",
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
                        </CardContent>
                        <CardActions
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
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
      {openDetail && (
        <OrderDetail
          order={selected}
          setOpenDetail={setOpenDetail}
        ></OrderDetail>
      )}
    </Grid>
  );
}
