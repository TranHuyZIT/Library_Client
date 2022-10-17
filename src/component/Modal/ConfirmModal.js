import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { libraryReducer } from "../../store/slices/libraryReducer";
import { addBook, deleteBook } from "../../utils/apiRequest";
import { userSelector } from "../../store/selectors";
import { createAxios } from "../../createInstance";
import { completeOrder } from "../../utils/apiRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 28,
  p: 4,
  borderRadius: "8px",
};

export default function ConfirmModal({
  open,
  setOpenConfirmModal,
  bookID,
  order,
}) {
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);

  const handleDelete = () => {
    if (bookID) {
      deleteBook(bookID, axiosJWT, currentUser?.accessToken);
      setOpenConfirmModal(false);
    }
    if (order) {
      completeOrder(order, currentUser?.accessToken, axiosJWT);
      setOpenConfirmModal(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpenConfirmModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: "center", fontSize: "24px" }}
          id="modal-modal-title"
          variant="h4"
          component="h4"
        >
          Bạn có chắc muốn thực hiện không?
        </Typography>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              setOpenConfirmModal(false);
            }}
            variant="outlined"
          >
            Hủy Bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{ marginLeft: "10px", backgroundColor: "primary.main" }}
          >
            Đồng Ý
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
