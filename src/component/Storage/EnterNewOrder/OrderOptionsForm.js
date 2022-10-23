import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import OrderDetailForm from "./OrderDetailForm";

export default function OrderOptionsForm() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const openOrderDetailForm = () => {
    return open && <OrderDetailForm setOpen={setOpen}></OrderDetailForm>;
  };
  return (
    <>
      <Fab
        sx={{
          position: "fixed",
          right: "0",
          top: "90vh",
        }}
        color="primary"
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      {openOrderDetailForm()}
    </>
  );
}
