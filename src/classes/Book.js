export default class Book {
  #name;
  #id;
  #author;
  #price;
  #img;
  #description;
  constructor(name, id, author, price, description, img) {
    this.#name = name;
    this.#id = id;
    this.#author = author;
    this.#price = price;
    this.#img = img;
    this.#description = description;
  }
  setPrice(price) {
    this.#price = price;
  }
  getPrice() {
    return this.#price;
  }
  getID() {
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  getAuthor() {
    return this.#author;
  }
  getIMG() {
    return this.#img;
  }
  getDescription() {
    return this.#description;
  }
}
