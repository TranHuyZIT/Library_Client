import Statistic from "../classes/Statistics";
import Library from "../classes/Library";
import Storage from "../classes/Storage";
import Book from "../classes/Book";
export const createLibraryInstance = (state) => {
  let books = state.storage.books.map((storeBook) => {
    const { name, id, author, price, description, img } = storeBook.bookInfo;
    let book = new Book(name, id, author, price, description, img);
    return {
      bookInfo: book,
      number: storeBook.number,
    };
  });
  const storage = new Storage(books);
  const statistics = new Statistic(state.statistic);
  const Lib = new Library(state.name, storage, statistics);
  return Lib;
};
