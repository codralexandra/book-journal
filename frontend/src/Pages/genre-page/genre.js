import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../../Components/navbar-component/Nav";
import BookSearch from "../../Components/book-search-component/BookSearch";

import "../../assets/style.css";

const Genre = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre");
  
    useEffect(() => {
      const fetchGenreBooks = async () => {
        if (!genre) return;
  
        setLoading(true);
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?subject=${genre}&page=1`
          );
          const data = await response.json();
  
          if (data && data.docs) {
            const booksData = data.docs.map((book) => ({
              id: book.key,
              title: book.title,
              author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
              cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
            }));
  
            setBooks(booksData);
          }
        } catch (error) {
          console.error("Error fetching genre books:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGenreBooks();
    }, [genre]);
  
    return (
      <div>
        <NavbarComponent />
        <BookSearch books={books} loading={loading} />
      </div>
    );
  };
  
  export default Genre;
