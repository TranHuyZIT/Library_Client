export default class Library {
  #name;
  #storage;
  #statistics;
  constructor(name, storage, statistics) {
    this.#name = name;
    this.#storage = storage;
    this.#statistics = statistics;
  }
  introduce() {
    return "Nhà sách Ngày Nắng là một tủ sách cho người trẻ tổng hợp nhiều loại sách, mang đến tri thức và hành trang chuẩn bị cho những bạn trẻ trên con đường tương lai sắp tới. Đến với Ngày Nắng, các bạn trẻ sẽ được tiếp xúc với những đầu sách mới HOT nhất, bán chạy nhất trên thị trường.";
  }
  importBook(book, number) {
    this.#storage.importBook(book);
  }
  sellBook(id, number, rating) {
    let price = this.#storage.sellBook(id, number);
    if (price) {
      const info = { price, number, rating };
      this.#statistics.updateStats(info);
    }
  }
  getStatistic() {
    return this.#statistics;
  }
  getAllBooks() {
    return this.#storage.getAllBooks();
  }
  search(searchText) {
    if (searchText) {
      return this.#storage.search(searchText);
    }
    return [];
  }
  getStats() {
    return this.#statistics.getStats();
  }
}
