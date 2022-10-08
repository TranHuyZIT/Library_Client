import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { searchReducer } from "../../store/slices/searchReducer";
import { userSelector } from "../../store/selectors";
import { createAxios } from "../../createInstance";
export default function SearchBar({ setOpenAddModal }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  useEffect(() => {
    dispatch(searchReducer.actions.setSearch(search));
  }, [search]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm Sách Trong Kho"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {currentUser && currentUser.admin && (
        <IconButton
          onClick={() => {
            setOpenAddModal(true);
          }}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <AddCircleIcon />
        </IconButton>
      )}
    </Paper>
  );
}
