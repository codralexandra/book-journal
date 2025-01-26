import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import defaultCover from "../../assets/default-cover.jpg";

const BookSearch = ({ books, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8;
  const totalPages = Math.ceil(books.length / resultsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = books.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div>
      {!loading && books.length > 0 && (
        <div className="mt-4">
          <Row className="g-4">
            {currentResults.map((book, index) => (
              <Col xs={12} md={6} lg={3} key={index}>
                <Card className="book-card">
                  <Card.Img
                    variant="top"
                    src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : defaultCover}
                    alt={book.title}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Button className="pageButton"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button> 
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button className="pageButton"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;