import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getBooksFromOrderDetails,
  completeOrder,
} from "../../utils/apiRequest";
import { createAxios } from "../../createInstance";
import { CircularProgress, Grid } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function createData(key, value) {
  return { key, value };
}

export default function OrderDetail({ setOpenDetail, order }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const rows = [
    createData("Họ Tên", order.fullName),
    createData("Số Điện Thoại", order.phoneNumber),
    createData("Địa Chỉ", order.address),
  ];

  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState("idle");
  const [loadingComplete, setLoadingComplete] = useState("idle");

  const handleComplete = () => {
    completeOrder(
      order,
      currentUser?.accessToken,
      axiosJWT,
      setLoadingComplete
    );
    setOpenDetail(false);
  };

  useEffect(() => {
    getBooksFromOrderDetails(
      order._id,
      currentUser?.accessToken,
      axiosJWT,
      setOrderDetails,
      setLoading
    );
  }, []);

  return (
    <Modal
      open={true}
      onClose={() => {
        setOpenDetail(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/order.png"
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <TableContainer
                sx={{ marginBottom: "24px", width: "100%" }}
                component={Paper}
              >
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.key}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={8}>
              {loading === "idle" ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sách</TableCell>
                        <TableCell align="right">Ảnh</TableCell>
                        <TableCell align="right">Giá</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderDetails.map((detail) => (
                        <TableRow
                          key={detail._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {detail.name}
                          </TableCell>
                          <TableCell align="right">
                            <img
                              style={{ width: "60px" }}
                              src={`${detail.img}`}
                            ></img>
                          </TableCell>
                          <TableCell align="right">{detail.price}</TableCell>
                          <TableCell align="right">{detail.number}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ width: "100%", justifyContent: "flex-end" }}>
          {loadingComplete === "idle" ? (
            <Button onClick={handleComplete} size="small">
              Đã Hoàn Thành
            </Button>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </CardActions>
      </Card>
    </Modal>
  );
}
