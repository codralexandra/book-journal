import React, { useState, useEffect } from "react";
import NavbarComponent from "../../Components/navbar-component/Nav";
import BookSearch from "../../Components/book-search-component/BookSearch";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const resultsPerPage = 8;
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  useEffect(() => {
    document.title = "Welcome to ShelfTalk - Main";
  }, []);

  const handleSearch = (bookIds) => {
    setLoading(true);
    setQuery(query);
    setPage(1);
    setSearchResults(bookIds);
    setTotalResults(bookIds.length);
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div id="mainPage">
      <NavbarComponent onSearch={handleSearch} setLoading={setLoading} />

      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && searchResults.length === 0 && (
        <div className="text-center mt-5">
          <h4>Search result will appear here</h4>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <BookSearch
          books={searchResults}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
