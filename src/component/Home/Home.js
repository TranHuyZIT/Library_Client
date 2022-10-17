import Grid from "@mui/material/Grid";
import NavBar from "../AppBar/AppBar";
import { Paper, Typography } from "@mui/material";
import MuiImageSlider from "mui-image-slider";
import { createLibraryInstance } from "../../utils/createLibraryInstance";
import { useSelector } from "react-redux";
import { librarySelector } from "../../store/selectors";
import { height } from "@mui/system";

export default function Home() {
  const imagesForSlide = [
    "https://cdn0.fahasa.com/media/magentothem/banner7/840x320_Manga.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/840x320_VTCNQD.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/STKT9_Banner_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/dongamamxanh_resize_840x320.jpg",
  ];
  const libraryState = useSelector(librarySelector);
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item xs={11}>
        <Paper sx={{ padding: "16px" }} elevation={5}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={8}>
              <MuiImageSlider
                className="imageslider"
                style={{ width: "100%" }}
                fitToImageHeight={true}
                autoPlay={true}
                images={imagesForSlide}
              ></MuiImageSlider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={12}>
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-09-2022/Big%20sale_Flash%20sale_Sub%20banner_392x156.jpg"
                    alt="error"
                  ></img>
                </Grid>
                <Grid item xs={12}>
                  <img
                    style={{ width: "100%" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/STKT9_Banner_392x156.jpg"
                    alt="error"
                  ></img>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{ marginTop: "24px" }}
            container
            justifyContent="center"
            spacing={2}
          >
            <Grid justifyContent="center" item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    padding: "24px",
                    backgroundColor: "primary.main",
                    borderRadius: "8px",
                    width: "20%",
                  }}
                  variant="h4"
                  component="h4"
                >
                  Về Chúng Tôi
                </Typography>
              </div>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item xs={3}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img className="logoHome" src="/1.png" />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid sx={{ height: "100%" }} container alignItems="center">
                      <Grid item xs={12}>
                        <Typography
                          className="BungeeFont"
                          sx={{ textAlign: "center", color: "secondary.main" }}
                          variant="h4"
                          component="h6"
                        >
                          Ngày Nắng
                        </Typography>
                        <p style={{ fontSize: "24px" }}>
                          Nhà sách Ngày Nắng là một tủ sách cho người trẻ tổng
                          hợp nhiều loại sách, mang đến tri thức và hành trang
                          chuẩn bị cho những bạn trẻ trên con đường tương lai
                          sắp tới. Đến với Ngày Nắng, các bạn trẻ sẽ được tiếp
                          xúc với những đầu sách mới HOT nhất, bán chạy nhất
                          trên thị trường.
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
