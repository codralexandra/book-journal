import React, { useEffect, useState } from "react";
import NavbarComponent from "../../Components/navbar-component/Nav";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import defaultCover from "../../assets/default-cover.jpg";
import axios from "axios";

import "../../assets/style.css";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/my-books", {
          params: { username },
        });

        if (response.status === 200) {
          setMyBooks(response.data);
        } else {
          console.error("Failed to fetch books:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching my books:", error);
        alert(
          error.response?.data?.message ||
            "An error occurred while fetching your books."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [username]);

  const handleRemoveFromMyBooks = async (book) => {
    const username = localStorage.getItem("username");

    try {
      const response = await axios.post(
        "http://localhost:5000/my-books/remove",
        {
          username,
          bookId: book.id,
        }
      );

      if (response.status === 200) {
        alert("Book removed from your collection!");
        // Update the local state to reflect the removed book
        setMyBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      } else {
        alert(response.data.message || "Failed to remove book");
      }
    } catch (error) {
      console.error("Error removing book:", error);
      alert("An error occurred while removing the book.");
    }
  };

  if (loading) {
    return (
      <div>
        <NavbarComponent />
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myBooksPage">
      <NavbarComponent />
      <div className="container">
        <h1 className="title">
          Hello, <i>{localStorage.username}</i>! <br /> Here are your books...
        </h1>
        <Row className="g-4">
          {myBooks.map((book, index) => (
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
                      className="cardActionButton"
                      onClick={() => handleRemoveFromMyBooks(book)}
                    >
                      {/* Remove button */}
                      <i class="bi bi-x-circle"></i>
                    </Button>
                    <Button className="cardActionButton">
                      {/* Favorite button */}
                      <i class="bi bi-heart"></i>
                    </Button>
                    <Button className="cardActionButton">
                      {/* Read button */}
                      <i class="bi bi-book"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MyBooks;
