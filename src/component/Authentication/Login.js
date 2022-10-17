import {
  Grid,
  Paper,
  Typography,
  Fade,
  Button,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import NavBar from "../AppBar/AppBar";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { loginUser } from "../../utils/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../../store/selectors";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector(loginSelector);
  const error = loginState.error;
  const isFetching = loginState.isFetching;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const user = {
        username,
        password,
      };
      loginUser(user, dispatch, navigate);
    }
  };
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Fade in={true}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ height: "500px", padding: "16px" }} elevation={6}>
            <Box
              className="BungeeFont"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                backgroundColor: "secondary.main",
                padding: "8px",
                borderRadius: "12px",
                color: "white",
              }}
            >
              Đăng Nhập
              <VpnKeyIcon
                sx={{ height: "100%", fontSize: "32px", marginLeft: "8px" }}
              />
            </Box>
            <Box
              sx={{
                padding: "16px",
              }}
            >
              <TextField
                sx={{ width: "100%", marginTop: "36px" }}
                id="outlined-textarea"
                label="Tên Tài Khoản"
                placeholder="Nhập vào tên tài khoản"
                multiline
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <TextField
                sx={{ width: "100%", marginTop: "36px" }}
                id="outlined-textarea"
                label="Mật Khẩu"
                placeholder="Nhập vào mật khẩu"
                type="password"
                hidden
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {isFetching ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <Typography
                  sx={{ textAlign: "center", color: "secondary.main" }}
                  variant="h4"
                >
                  {error}
                </Typography>
              )}
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={(e) => {
                    handleLogin(e);
                  }}
                  variant="contained"
                >
                  Đăng nhập
                </Button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Fade>
    </Grid>
  );
}
