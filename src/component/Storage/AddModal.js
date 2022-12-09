import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { libraryReducer } from "../../store/slices/libraryReducer";
import { addBook, getBookGenres } from "../../utils/apiRequest";
import { userSelector } from "../../store/selectors";
import { createAxios } from "../../createInstance";
import {
  Backdrop,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import BackdropLoading from "../Modal/BackdropLoading";
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
};

export default function AddModal({ open, setOpenAddModal }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState(0);
  const [img, setIMG] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);

  useEffect(() => {
    if (name && author && number && img && des && price) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, author, number, price, img, des, valid]);

  useEffect(() => {
    getBookGenres(setAllGenres);
  }, []);

  const handleAdd = () => {
    const info = {
      name,
      author,
      number: Number.parseInt(number),
      img,
      price,
      description: des,
      genre: selectedGenre,
    };
    addBook(info, axiosJWT, currentUser.accessToken, setLoading);
    setOpenAddModal(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpenAddModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              padding: " 12px 8px",
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "4px",
            }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Thêm Sách Vào Kho
          </Typography>
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Tên Sách"
            id="fullWidth"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Tác Giả"
            id="fullWidth"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Số Lượng"
            id="fullWidth"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Link Ảnh"
            id="fullWidth"
            onChange={(e) => {
              setIMG(e.target.value);
            }}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Mô Tả"
            id="fullWidth"
            onChange={(e) => {
              setDes(e.target.value);
            }}
          />
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
            label="Giá"
            id="fullWidth"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {currentUser?.admin ? (
            <FormControl sx={{ marginTop: "10px" }} fullWidth>
              <InputLabel>Thể loại</InputLabel>
              <Select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                }}
                label="Thể loại"
              >
                {allGenres.map((genre, index) => {
                  return (
                    <MenuItem key={`add-genre${index}`} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <></>
          )}
          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleAdd} disabled={!valid} variant="contained">
              Thêm
            </Button>
          </Box>
        </Box>
      </Modal>
      <BackdropLoading loading={loading} setLoading={setLoading} />
    </>
  );
}
