import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import cartReducer from "../../store/slices/cartReducer";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, userSelector } from "../../store/selectors";
import { logoutUser } from "../../utils/apiRequest";
import { createAxios } from "../../createInstance";
import { addOrder } from "../../utils/apiRequest";

const pages = [
  "Giới Thiệu",
  "Kho Sách",
  "Thống Kê",
  "Đăng Ký",
  "Đăng Nhập",
  "Đơn Hàng",
];
const link = ["/", "/storage", "/statistic", "/register", "/login", "/orders"];
const NavBar = () => {
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(cartSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElNavCart, setAnchorElNavCart] = useState(null);

  const handleSell = () => {
    if (currentUser) {
      let price = 0,
        rating = 0;
      cart.forEach((cartItem) => {
        price += cartItem.price;
        rating += cartItem.rating;
      });
      console.log(rating);
      rating /= cart.length;
      console.log(price, rating);
      const newOrder = {
        userID: currentUser._id,
        userName: currentUser.username,
        books: [...cart],
        totalPrice: price,
        rating,
      };
      addOrder(newOrder, currentUser.accessToken, axiosJWT);
      dispatch(cartReducer.actions.clearCart());
    } else {
      navigate("/login");
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    handleCloseCart();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logoutUser(dispatch, navigate, currentUser?.accessToken, axiosJWT);
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenCart = (event) => {
    setAnchorElNavCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorElNavCart(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            className="BungeeFont"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Ngày Nắng
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoStoriesIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LIBRARY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => {
              if (page === "Đăng Ký" || page === "Đăng Nhập") {
                return (
                  !currentUser && (
                    <Link
                      key={page}
                      style={{ textDecoration: "none" }}
                      to={link[index]}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  )
                );
              } else if (page === "Đơn Hàng" || page === "Thống Kê") {
                return (
                  currentUser?.admin && (
                    <Link
                      key={page}
                      style={{ textDecoration: "none" }}
                      to={link[index]}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  )
                );
              } else {
                return (
                  <Link
                    key={page}
                    style={{ textDecoration: "none" }}
                    to={link[index]}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                );
              }
            })}
          </Box>
          {currentUser && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleOpenCart}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
                <Menu
                  sx={{ top: "40px" }}
                  id="menu-appbar"
                  anchorEl={anchorElNavCart}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNavCart)}
                  onClose={handleCloseCart}
                >
                  {cart.length > 0 ? (
                    cart.map((cartItem) => {
                      return (
                        <MenuItem
                          sx={{ height: "64px" }}
                          onClick={handleCloseCart}
                        >
                          <img style={{ height: "100%" }} src={cartItem.img} />
                          <Typography sx={{ marginLeft: "8px" }} variant="h7">
                            {cartItem.name}
                          </Typography>
                        </MenuItem>
                      );
                    })
                  ) : (
                    <Typography sx={{ padding: "8px" }}>
                      Chưa có sách
                    </Typography>
                  )}
                  {cart.length > 0 && (
                    <MenuItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button onClick={handleSell} variant="contained">
                        Mua
                      </Button>
                    </MenuItem>
                  )}
                </Menu>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ fontSize: "16px" }}
                  textAlign="center"
                >{`${currentUser.username}`}</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  sx={{ top: "40px" }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
