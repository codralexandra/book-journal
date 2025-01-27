import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import defaultCover from "../../assets/default-cover.jpg";
import axios from "axios";

const BookSearch = ({ books, loading }) => {
  const resultsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddToMyBooks = async (book) => {
    const username = localStorage.getItem("username");

    try {
      const response = await axios.post("http://localhost:5000/my-books/add", {
        username,
        book,
      });

      if (response.status === 200) {
        alert("Book added to your collection!");
      } else {
        alert(response.data.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(books.length / resultsPerPage))
      return;
    setCurrentPage(newPage);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = books.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div>
      {!loading && books.length > 0 && (
        <div className="bookDisplay">
          <Row className="g-4">
            {currentResults.map((book, index) => (
              <Col xs={12} md={6} lg={3} key={index}>
                <Card className="book-card">
                  <Card.Img
                    variant="top"
                    src={book.cover ? book.cover : defaultCover}
                    alt={book.title}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author || "Unknown Author"}
                    </Card.Subtitle>
                    <div className="cardButtons">
                      <Button
                        className="cardActionButton addButton"
                        onClick={() => handleAddToMyBooks(book)}
                      >
                        <i className="bi bi-plus-circle"></i>
                      </Button>
                      <a target="_blank" href={book.link}>
                        <Button className="cardActionButton infoButton">
                          <i className="bi bi-info-circle"></i>
                        </Button>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button
              className="pageButton"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="mx-2">
              Page {currentPage} of {Math.ceil(books.length / resultsPerPage)}
            </span>
            <Button
              className="pageButton"
              disabled={currentPage >= Math.ceil(books.length / resultsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center mt-5">
          <h4>No books found.</h4>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
