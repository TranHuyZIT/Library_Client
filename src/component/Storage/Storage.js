import Grid from "@mui/material/Grid";
import "./storage.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDelay from "../../hooks/useDelay";
import {
  librarySelector,
  searchSelector,
  userSelector,
} from "../../store/selectors";
import OrderOptionsForm from "./EnterNewOrder/OrderOptionsForm";
import NavBar from "../AppBar/AppBar";
import BookCard from "./BookCard";
import AddModal from "./AddModal";
import SearchBar from "./SearchBar";
import DetailModal from "./DetailModal";
import { Paper } from "@mui/material";
import ConfirmModal from "../Modal/ConfirmModal";
import searchBook from "../../utils/searchBook";
import Section from "../Home/Section";
import Filter from "./Filter";
export default function Storage() {
  let libraryInfo = useSelector(librarySelector);
  const books = libraryInfo.books;
  const { search } = useSelector(searchSelector);
  const delayedSearch = useDelay(search);
  const currentUser = useSelector(userSelector);

  const [result, setResult] = useState([...books]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [priceFilter, setPriceFilter] = useState([]);

  const handleChangeFilter = (list) => {
    if (priceFilter.length == 0) {
      setResult([...list]);
      return;
    }
    let filterResult = [];
    for (let filter of priceFilter) {
      let from = +filter.split(" ")[0];
      let to = +filter.split(" ")[1];
      if (to == "00") {
        for (let book of list?.filter((book) => book.price > from * 10000)) {
          filterResult.push(book);
        }
      } else {
        for (let book of list?.filter(
          (book) => book.price > from * 10000 && book.price < to * 10000
        )) {
          filterResult.push(book);
        }
      }
    }
    setResult([...filterResult]);
  };

  // Enter New Order Step 1
  const createOrderOptionForm = () => {
    return currentUser && <OrderOptionsForm></OrderOptionsForm>;
  };

  useEffect(() => {
    handleChangeFilter(books);
  }, [priceFilter]);

  useEffect(() => {
    let searchResult = searchBook(books, delayedSearch, setResult);
    setResult([...searchResult]);
    handleChangeFilter(searchResult);
  }, [delayedSearch]);
  useEffect(() => {
    const { book, id, btn } = selected;
    if (id) {
      if (btn === "detail") setOpenDetailModal(true);
      if (btn === "delete") setOpenDeleteModal(true);
    }
  }, [selected]);
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item xs={11}>
        <Paper sx={{ padding: "16px" }} elevation={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SearchBar setOpenAddModal={setOpenAddModal} />
            </Grid>
            <Grid item justifyContent="center" xs={12} sm={5} md={4} lg={3}>
              <Section
                style={{ width: "100%" }}
                heading="Tìm theo"
                setState={[setPriceFilter]}
                Children={Filter}
              ></Section>
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9}>
              <Grid container spacing={2}>
                {result.length === 0 &&
                  delayedSearch === "" &&
                  result.map((book, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={3} key={book._id}>
                      <BookCard
                        name={book.name}
                        author={book.author}
                        description={book.description}
                        img={book.img}
                        delay={index !== 0 ? true : false}
                        book={book}
                        setSelected={setSelected}
                      ></BookCard>
                    </Grid>
                  ))}
                {result.length !== 0 &&
                  result.map((book, index) => {
                    return (
                      <Grid item xs={6} sm={4} md={3} lg={3} key={book._id}>
                        <BookCard
                          name={book.name}
                          author={book.author}
                          description={book.description}
                          img={book.img}
                          delay={index !== 0 ? true : false}
                          book={book}
                          setSelected={setSelected}
                          isAdmin={currentUser?.admin}
                        ></BookCard>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <AddModal open={openAddModal} setOpenAddModal={setOpenAddModal} />
      {selected.book && openDetailModal && (
        <DetailModal
          open={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          book={{ ...selected.book } || {}}
        />
      )}
      {selected && openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          setOpenConfirmModal={setOpenDeleteModal}
          bookID={selected.id}
        />
      )}
      {createOrderOptionForm()}
    </Grid>
  );
}
