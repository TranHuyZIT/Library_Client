import axios from "axios";
import Home from "./component/Home/Home";
import StorageComponent from "./component/Storage/Storage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { libraryReducer } from "./store/slices/libraryReducer";
import { librarySelector } from "./store/selectors";
import { getAllBooks } from "./utils/apiRequest";
import Statistic from "./component/Statistic/Statistic";
import Register from "./component/Authentication/Register";
import Login from "./component/Authentication/Login";
import Orders from "./component/Orders/Orders";
// const book1 = new Book(
//   "Hành Trình Đi Về Phương Đông",
//   "1",
//   "Gia Huy",
//   "65000",
//   "Một quyển sách rất hay"
// );
// const book2 = new Book(
//   "Hành Trình Đi Về Phương Tây",
//   "2",
//   "Gia Huy",
//   "75000",
//   "Một quyển sách rất hay"
// );

// const storage = new Storage([]);
// const statistics = new Statistic();
// const ctuLib = new Library("CTU", storage, statistics);
// // Import Book
// ctuLib.importBook(book1);
// ctuLib.importBook(book1);
// ctuLib.importBook(book1);
// ctuLib.importBook(book1);
// ctuLib.importBook(book2);
// ctuLib.importBook(book2);
// ctuLib.importBook(book2);
// // Sell Book
// ctuLib.sellBook("1", 2, 5);
// ctuLib.sellBook("2", 2, 4);

function App() {
  const dispatch = useDispatch();
  const library = useSelector(librarySelector);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks(setBooks, dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storage" element={<StorageComponent />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
