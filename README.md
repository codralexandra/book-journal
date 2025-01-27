# ShelfTalk
**Description:** 
<br />
A dynamic platform for book enthusiasts to connect, discuss, and share their literary adventures. Users can search & save their favorite books and connect with other readers.<br />

**Technical specifications:**
<br />
<ul>
  <li>Frontend: React, react-bootstrap, Axios</li>
  <li>Backend: Nodejs, Express, Websockets, MongoDB</li>
  <li>Testing: Jest, Playwright</li>
</ul>
<br /> 

**Features:**
<br />
<ul>
  <li>User creation</li>
  <li>Search for any book title</li>
  <li>View different genres</li>
  <li>Connect with other users via global chatroom</li>
  <li>Save your favorite books to view later (tbi)</li>
</ul>
<br /> 

**Installation:**
<br />
1. Clone the repository:
```
git clone https://github.com/codralexandra/book-journal.git
```
2. Open the repository in vsCode. <br />
3. Open a new terminal and navigate to the backend folder.
```
cd ./backend
```
4. Install the necessary packages:
```
npm install
```
5. In the `.env` file, please add your own MongoDB connection string. Eg: `MONGODB_URI=mongodb://localhost:PORT/db-name`<br />
6. To start the server use the following command:
```
node index.js
```
7. Navigate to the frontend folder:
```
cd ../frontend
```
8. Start the React app:
```
npm start
```
9. To run the unit & integration tests
```
npm test
```

**Screenshots:**
1. Home page <br/>
![Home page](/screenshots/home-page.png)
2. Main page <br />
![Main page](/screenshots/main-page.png)
4. Global chat <br />
![Global chat](/screenshots/chat-room.png)
5. My Books <br />
![My Books](/screenshots/my-books.png)

<br />
Here is the demo app pitch <a href="https://www.canva.com/design/DAGZNq5ytaw/tb4IvFt8mC917Up46YKNkQ/edit?utm_content=DAGZNq5ytaw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">presentation</a> with a full rundown of all the functionalities (I will someday get to implement). 
