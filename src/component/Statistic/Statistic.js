import { Fade, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";
import { createAxios } from "../../createInstance";
import { getAllOrders } from "../../utils/apiRequest";
import NavBar from "../AppBar/AppBar";
import CircularStatic from "./Progress";
export default function Statistic() {
  let rev = 0,
    number = 0,
    totalRating = 0;
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const [orders, setOrders] = useState([]);
  const [info, setInfo] = useState({
    rev: 0,
    number: 0,
    totalRating: 0,
    totalRater: 0,
  });
  useEffect(() => {
    getAllOrders(setOrders, currentUser?.accessToken, axiosJWT, true);
  }, []);
  useEffect(() => {
    console.log(orders);

    orders.forEach((order) => {
      rev += order.totalPrice;
      number += order.books.length;
      totalRating += order.rating;
    });
    const newInfo = {
      rev,
      number,
      totalRating,
      totalRater: orders.length,
    };
    console.log(totalRating, orders.length);
    setInfo(newInfo);
  }, [orders]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid sx={{ marginTop: "8px" }} item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Fade in={true} style={{ transitionDelay: `100ms` }}>
              <Paper sx={{ height: "500px" }} elevation={3}>
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "12px 8px",
                    color: "primary.main",
                  }}
                  variant="h4"
                  component="h4"
                >
                  Doanh Thu
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "32px",
                  }}
                >
                  <Paper
                    sx={{ width: "50%", borderRadius: "50%" }}
                    elevation={6}
                  >
                    <Typography
                      sx={{ textAlign: "center", padding: "80px 64px" }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {info.rev}
                    </Typography>
                  </Paper>
                </div>
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "16px",
                    color: "secondary.main",
                  }}
                  variant="h6"
                  component="h6"
                >
                  {`Tổng doanh thu của thư viện là ${info.rev}`}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={4}>
            <Fade in={true} style={{ transitionDelay: `200ms` }}>
              <Paper sx={{ height: "500px" }} elevation={3}>
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "12px 8px",
                    color: "primary.main",
                  }}
                  variant="h4"
                  component="h4"
                >
                  Số Lượng
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "32px",
                  }}
                >
                  <Paper
                    sx={{ width: "50%", borderRadius: "50%" }}
                    elevation={6}
                  >
                    <Typography
                      sx={{ textAlign: "center", padding: "80px 64px" }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {info.number}
                    </Typography>
                  </Paper>
                </div>
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "16px",
                    color: "secondary.main",
                  }}
                  variant="h6"
                  component="h6"
                >
                  {`Tổng số lượng sách thư viện bán được là ${info.number}`}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
          <Grid item xs={4}>
            <Fade in={true} style={{ transitionDelay: `300ms` }}>
              <Paper sx={{ height: "500px" }} elevation={3}>
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "12px 8px",
                    color: "primary.main",
                  }}
                  variant="h4"
                  component="h4"
                >
                  Đánh Giá
                </Typography>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "32px",
                  }}
                >
                  <Paper sx={{ width: "50%" }} elevation={6}>
                    <div style={{ textAlign: "center", padding: "48px" }}>
                      <CircularStatic
                        value={(info.totalRating / info.totalRater / 5) * 100}
                        progress={info.totalRating / info.totalRater}
                      />
                    </div>
                  </Paper>
                </div>
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "16px",
                    color: "secondary.main",
                  }}
                  variant="h6"
                  component="h6"
                >
                  {`Thư viện có tỷ lệ đánh giá là ${(
                    info.totalRating / info.totalRater
                  ).toFixed(1)} sao và số người đánh giá là ${
                    info.totalRater
                  } người`}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
