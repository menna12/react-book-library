import React from "react";
import Book from "./Book";
import styles from './BookShelf.module.css';
const Bookshelf = props => {
  const { books, title, setBooks } = props;

  return (
    <div className="bookshelf">
      <h2 className={styles.bookshelftitle}>{title}</h2>
      <div className={styles.bookshelfbooks}>
        <ol className={styles.booksgrid}>
          {books &&
            books.map((book, index) => (
              <li key={index}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                  bookshelf={book.shelf}
                  book={book}
                  setBooks={setBooks}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
