export const createStateLibrary = (libName, booksInput, statistic) => {
  return {
    name: libName,
    storage: {
      books: [...booksInput],
    },
    statistic,
  };
};
