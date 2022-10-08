export default class Storage {
  #books;
  //    [
  //     {
  //         bookInfo: book,
  //         number: 2
  //     }
  //     ]
  constructor(books) {
    this.#books = [...books];
  }
  importBook(book) {
    let isInStorage = false;
    this.#books.forEach((storeBook) => {
      if (storeBook.bookInfo.getID() === book.getID()) {
        storeBook.number++;
        isInStorage = true;
        return;
      }
    });
    if (!isInStorage) {
      this.#books.push({ bookInfo: book, number: 1 });
    }
  }
  sellBook(id, number) {
    let price = 0;
    this.#books.forEach((storeBook, index) => {
      if (storeBook.bookInfo.getID() === id && storeBook.number > number) {
        storeBook.number -= number;
        if (storeBook.number <= 0) {
          this.#books.splice(index, 1);
        } else {
          price += Number.parseInt(storeBook.bookInfo.getPrice()) * number;
          return;
        }
      }
    });
    return price;
  }
  getAllBooks() {
    return [...this.#books];
  }
  search(searchText) {
    let result = [];
    this.#books.forEach((storeBook) => {
      let string =
        storeBook.bookInfo.getID() +
        storeBook.bookInfo.getName() +
        storeBook.bookInfo.getAuthor();
      if (
        string
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(searchText.toLowerCase().replaceAll(" ", ""))
      ) {
        result.push(storeBook);
      }
    });
    return result;
  }
}
