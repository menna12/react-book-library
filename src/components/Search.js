import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Book from "./Book";

import * as BooksAPI from "../BooksAPI";

import styles from './Search.module.css';

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearchTextChange = event => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then(searchedBooks => {
        if (!searchedBooks.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearchedBooks(setDefaultShelves(searchedBooks, myBooks));
          });
        } else {
          setSearchedBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchedBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    return searchedBooksLocal.map(book => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
  };

  useEffect(() => {
    handleSearchTextChange();
  }, [searchText]);

  return (
    <div className={styles.searchbooks}>
      <div className={styles.searchbooksbar}>
        <button className={styles.closesearch} onClick={() => navigate("/")}>
          Home
        </button>
        <div className={styles.searchbooksinputwrapper}>
          <input
            type="text"
            placeholder="Search with title or author"
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.searchbooksresults}>
      {
        (searchedBooks.length > 0) ? <ol className={styles.booksgrid}>
        {
          searchedBooks.map((book, index) => (
            <Book
              key={index}
              title={book.title}
              authors={book.authors}
              imageUrl={book.imageLinks && book.imageLinks.thumbnail}
              bookshelf={book.shelf}
              book={book}
              isSearching
            />
          ))}
      </ol> : <p className={styles.noresultmsg}> No result found</p>
      }
      </div>
    </div>
  );
};

export default Search;
