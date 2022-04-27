const generatePageNumbers = (currentPage, totalPages) => {
  let delta = 1;
  if (currentPage === 1 || totalPages === currentPage) {
    delta = 2;
  }
  const range = Array(totalPages)
    .fill()
    .map((_, index) => index + 1);
  return range.reduce((pages, page) => {
    if (page === 1 || page === totalPages) {
      return [...pages, page];
    }
    if (page - delta <= currentPage && page + delta >= currentPage) {
      return [...pages, page];
    }
    if (pages[pages.length - 1] !== '...') {
      return [...pages, '...'];
    }

    return pages;
  }, []);
};

const generatePagination = (currentPage, totalPages) => {
  const currentPageNumber = parseInt(currentPage, 10);
  let pageNumbers = generatePageNumbers(currentPageNumber, totalPages);
  if (currentPageNumber !== 1) {
    pageNumbers = ['prev', ...pageNumbers];
  }
  if (currentPageNumber !== totalPages) {
    pageNumbers = [...pageNumbers, 'next'];
  }
  return pageNumbers;
};
module.exports = {
  generatePagination,
};
