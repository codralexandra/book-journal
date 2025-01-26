// api.test.js
import { fetchBookDetails } from './fetchBook';

test('fetches and displays real book details from OpenLibrary API', async () => {
  const query = 'the lord of the rings';
  
  const bookDetails = await fetchBookDetails(query); 
  
  expect(bookDetails).toBeDefined();
  
  expect(bookDetails.docs).toBeDefined();
  expect(bookDetails.docs.length).toBeGreaterThan(0); 

  const firstBook = bookDetails.docs[0];
  expect(firstBook.title).toBeDefined();
  expect(firstBook.author_name).toBeDefined();
  expect(firstBook.key).toBeDefined();

  expect(firstBook.title.toLowerCase()).toContain('lord of the rings');
});


test('fetches books with pagination', async () => {
    const query = 'harry potter';
    const page = 1; 
    const limit = 2;

    const bookDetailsPage1 = await fetchBookDetails(`${query}&page=${page}&limit=${limit}`);
    
    expect(bookDetailsPage1).toBeDefined();
    expect(bookDetailsPage1.docs).toBeDefined();
    
    expect(bookDetailsPage1.docs.length).toBeLessThanOrEqual(limit);
    
    const firstBook = bookDetailsPage1.docs[0];
    expect(firstBook.title).toBeDefined();
    expect(firstBook.author_name).toBeDefined();
    expect(firstBook.key).toBeDefined();
  
    const bookDetailsPage2 = await fetchBookDetails(`${query}&page=2&limit=${limit}`);
    
    expect(bookDetailsPage2).toBeDefined();
    expect(bookDetailsPage2.docs).toBeDefined();
    
    expect(bookDetailsPage2.docs.length).toBeLessThanOrEqual(limit);
    
    const firstBookOnPage1 = bookDetailsPage1.docs[0].title;
    const firstBookOnPage2 = bookDetailsPage2.docs[0].title;
    expect(firstBookOnPage1).not.toEqual(firstBookOnPage2);
  });