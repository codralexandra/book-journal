import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Search = ({ onSearch, setLoading }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Typed in searchbar:", query);
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}&page=1`);
      const data = await response.json();

      console.log("API Response:", data);

      if (data && data.docs) {
        const books = data.docs.map((book) => ({
          id: book.key,
          title: book.title,
          author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
          cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
        }));

        onSearch(books); 
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching book data:", error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSearch} inline={true}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Find books..."
            className="search-form"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button id="search-button" type="submit">
            <i className="bi bi-search"></i>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
