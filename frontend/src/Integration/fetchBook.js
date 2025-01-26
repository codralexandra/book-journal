import axios from 'axios';

export const fetchBookDetails = async (query) => {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    return response.data;
  };