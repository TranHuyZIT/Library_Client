import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDelay from "../../hooks/useDelay";
import {
  librarySelector,
  searchSelector,
  userSelector,
} from "../../store/selectors";
import { createLibraryInstance } from "../../utils/createLibraryInstance";
import NavBar from "../AppBar/AppBar";
import BookCard from "./BookCard";
import AddModal from "./AddModal";
import SearchBar from "./SearchBar";
import DetailModal from "./DetailModal";
import { Paper } from "@mui/material";
export default function Storage() {
  let libraryInfo = useSelector(librarySelector);
  const books = libraryInfo.books;
  const { search } = useSelector(searchSelector);
  const delayedSearch = useDelay(search);
  const currentUser = useSelector(userSelector);

  const [result, setResult] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selected, setSelected] = useState({});

  const searchBook = (searchText) => {
    let result = [];
    books.forEach((book) => {
      let string = book.name + book.author;
      if (
        string
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchText.toLowerCase().replaceAll(" ", ""))
      ) {
        result.push(book);
      }
    });
    return result;
  };
  useEffect(() => {
    setResult([...searchBook(delayedSearch)]);
  }, [delayedSearch]);
  useEffect(() => {
    const { book, id } = selected;
    if (id) {
      setOpenDetailModal(true);
    }
  }, [selected]);
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item xs={11}>
        <Paper sx={{ padding: "16px" }} elevation={5}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <SearchBar setOpenAddModal={setOpenAddModal} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {result.length === 0 &&
                  delayedSearch === "" &&
                  books.map((book, index) => (
                    <Grid item xs={6} sm={4} md={3} key={book._id}>
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
                      <Grid item xs={2} key={book._id}>
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
      {selected.book && (
        <DetailModal
          open={openDetailModal}
          setOpenDetailModal={setOpenDetailModal}
          book={{ ...selected.book } || {}}
        />
      )}
    </Grid>
  );
}
