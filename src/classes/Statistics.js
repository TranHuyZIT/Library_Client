export default class Statistic {
  #revenue;
  #numberBooksSold;
  #totalRating;
  #totalRater;
  constructor(stats) {
    const { rev, number, totalRating, totalRater } = stats;
    this.#revenue = rev;
    this.#numberBooksSold = number;
    this.#totalRating = totalRating;
    this.#totalRater = totalRater;
  }
  addRevenue(rev) {
    this.#revenue += rev;
  }
  getRevenue() {
    return this.#revenue;
  }
  addNumberBookSold(numBooks) {
    this.#numberBooksSold += numBooks;
  }
  getNumberBooksSold() {
    return this.#numberBooksSold;
  }
  addTotalRating(rating) {
    this.#totalRater++;
    this.#totalRating = (this.#totalRating + rating) / this.#totalRater;
  }
  getTotalRating() {
    return this.#totalRating;
  }
  updateStats(info) {
    const { price, number, rating } = info;
    this.addNumberBookSold(number);
    this.addRevenue(price);
    this.addTotalRating(rating);
  }
  getStats() {
    return {
      rev: this.#revenue,
      number: this.#numberBooksSold,
      totalRating: this.#totalRating,
      totalRater: this.#totalRater,
    };
  }
}
