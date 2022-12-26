import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import styles from "./App.module.css";
import Bookshelf from "./components/BookShelf";
import { useNavigate } from "react-router-dom";

const bookshelves = [
  { title: "Currently Reading", shelfName: "currentlyReading" },
  { title: "Want to Read", shelfName: "wantToRead" },
  { title: "Read", shelfName: "read" }
];

const App = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BooksAPI.getAll().then(booksFromApi => {
      setBooks(booksFromApi);
    });
  }, []);

  return (
    <div>
      <div className={styles.listbooks}>
        <div className={styles.listbookstitle}>
          <h1>My Reads</h1>
        </div>
        <div className={styles.listbookscontent}>
          <div>
            {bookshelves.map((bookshelf, index) => (
              <Bookshelf
                key={index}
                title={bookshelf.title}
                books={
                  books &&
                  books.filter(
                    book => book && book.shelf === bookshelf.shelfName
                  )
                }
                setBooks={setBooks}
              />
            ))}
          </div>
        </div>
        <div className={styles.opensearch}>
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
    </div>
  );
};

export default App;
