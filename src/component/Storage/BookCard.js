import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
export default function BookCard({
  name,
  author,
  description,
  img,
  delay,
  book,
  setSelected,
  isAdmin,
}) {
  return (
    <Zoom in={true} style={{ transitionDelay: delay ? "100ms" : "0ms" }}>
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
          image={img}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              fontWeight: "700",
              color: "secondary.main",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isAdmin && (
            <Button
              sx={{ backgroundColor: "primary.main" }}
              variant="contained"
              onClick={() => {
                const selected = {
                  book,
                  id: book._id,
                };
                setSelected(selected);
              }}
              size="small"
            >
              Xóa Bỏ
            </Button>
          )}
          <Button
            sx={{ backgroundColor: "secondary.main" }}
            variant="contained"
            onClick={() => {
              const selected = {
                book,
                id: book._id,
              };
              setSelected(selected);
            }}
            size="small"
          >
            Chi Tiết
          </Button>
        </CardActions>
      </Card>
    </Zoom>
  );
}
