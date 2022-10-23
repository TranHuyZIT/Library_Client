import {
  Grid,
  Paper,
  Typography,
  Fade,
  CircularProgress,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import NavBar from "../AppBar/AppBar";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { loginUser, registerUser } from "../../utils/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSelector } from "../../store/selectors";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerState = useSelector(registerSelector);
  const isFetching = registerState.isFetching;
  const error = registerState.error;
  console.log(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = () => {
    if (username && password && email) {
      registerUser(
        {
          username,
          email,
          password,
        },
        dispatch,
        navigate
      );
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
              Đăng Ký
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
                sx={{ width: "100%", marginTop: "30px" }}
                id="outlined-textarea"
                label="Tên Tài Khoản"
                placeholder="Nhập vào tên tài khoản"
                multiline
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                sx={{ width: "100%", marginTop: "30px" }}
                id="outlined-textarea"
                label="Email"
                placeholder="Nhập vào Email"
                multiline
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                sx={{ width: "100%", marginTop: "30px" }}
                id="outlined-textarea"
                label="Mật Khẩu"
                placeholder="Nhập vào mật khẩu"
                type="password"
                multiline
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    handleRegister();
                  }
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
                <Button onClick={handleRegister} variant="contained">
                  Đăng Ký
                </Button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Fade>
    </Grid>
  );
}
