export default function searchBook(books, searchText, setResult) {
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
  setResult(result);
  return result;
}
