import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { libraryReducer } from "../../store/slices/libraryReducer";
import { addBook } from "../../utils/apiRequest";
import { userSelector } from "../../store/selectors";
import { createAxios } from "../../createInstance";
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

export default function DeleteModal({ open, setOpenDeleteModal, bookID }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const axiosJWT = createAxios(currentUser);

  const handleDelete = () => {
    addBook(info, axiosJWT, currentUser.accessToken);
    setOpenAddModal(false);
  };
  return (
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
      </Box>
    </Modal>
  );
}
