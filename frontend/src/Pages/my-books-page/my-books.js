import React, { useEffect, useState } from "react";
import NavbarComponent from "../../Components/navbar-component/Nav";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Dropdown } from "react-bootstrap";
import defaultCover from "../../assets/default-cover.jpg";
import axios from "axios";

import "../../assets/style.css";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("all"); // Tracks the selected sort option
  const username = localStorage.getItem("username");

  // Fetching books on component mount
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

  // Handler for changing sort option
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sort and filter books based on selected option (All, Read, Favorite)
  const sortedBooks = () => {
    if (sortOption === "read") {
      return myBooks.filter((book) => book.read);
    } else if (sortOption === "favorite") {
      return myBooks.filter((book) => book.favorite);
    }
    return myBooks; // Return all books if "All" is selected
  };

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
        setMyBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      } else {
        alert(response.data.message || "Failed to remove book");
      }
    } catch (error) {
      console.error("Error removing book:", error);
      alert("An error occurred while removing the book.");
    }
  };

  const handleSetFavorite = async (book) => {
    const username = localStorage.getItem("username");

    try {
      const response = await axios.post(
        "http://localhost:5000/my-books/favorite",
        {
          username,
          bookId: book.id,
        }
      );

      if (response.status === 200) {
        setMyBooks((prevBooks) =>
          prevBooks.map((b) =>
            b.id === book.id ? { ...b, favorite: true } : b
          )
        );
      }
    } catch (error) {
      console.error("Error setting favorite:", error);
    }
  };

  const handleSetRead = async (book) => {
    const username = localStorage.getItem("username");

    try {
      const response = await axios.post(
        "http://localhost:5000/my-books/read",
        {
          username,
          bookId: book.id,
        }
      );

      if (response.status === 200) {
        setMyBooks((prevBooks) =>
          prevBooks.map((b) =>
            b.id === book.id ? { ...b, read: true } : b
          )
        );
      }
    } catch (error) {
      console.error("Error setting read status:", error);
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

        {/* Sort Dropdown */}
        <div className="mb-4">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="sort-dropdown">
              Sort By: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange("all")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("read")}>
                Read
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("favorite")}>
                Favorite
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row className="g-4">
          {sortedBooks().map((book, index) => (
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
                      className="cardActionButton removeButton"
                      onClick={() => handleRemoveFromMyBooks(book)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                    <Button
                      className={`cardActionButton favoriteButton ${
                        book.favorite ? "active" : ""
                      }`}
                      onClick={() => handleSetFavorite(book)}
                    >
                      <i className={`bi ${book.favorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    </Button>
                    <Button
                      className={`cardActionButton readButton ${
                        book.read ? "active" : ""
                      }`}
                      onClick={() => handleSetRead(book)}
                    >
                      <i className={`bi ${book.read ? "bi-book-fill" : "bi-book"}`}></i>
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
