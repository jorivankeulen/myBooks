import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import AddBook from './AddBook'
import { Route, Link } from "react-router-dom"

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
  }

  constructor() {
    super()

    //init with all books to state
    BooksAPI.getAll().then((books) => (
      this.setState({
        books
      })
    ))
  }

  getBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => (
      book.shelf.includes(shelf)
    ))
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((data) => {
      this.setState({searchResults: (data != null && data.length > 0) ? data : []})
    })
  }

  bookExists = (book) => {
    return this.state.books.some(b => b.id === book.id)
  }

  clearSearch = () => {
    this.setState({searchResults: []})
  }
  moveBook = (book, shelf) => {
    let _books = Object.assign(this.state.books, [])

    // New book
    if (!this.bookExists(book)) {
      BooksAPI.update(book, shelf).then((books) => {
        let _newBook = book
        _newBook.shelf = shelf
        _books.push(_newBook)
        this.setState({books: _books})
      })
    // Existing book
    } else {
      BooksAPI.update(book, shelf).then((books) => {
        let _id = book.id
        this.setState(prevState => ({
          books: prevState.books.map(
            book => book.id === _id ? { ...book, shelf: shelf} : book
          )
        }))
      })

    }
  }

  render() {
    const currentlyReadingCollection = this.getBooksByShelf("currentlyReading");
    const wantToReadCollection = this.getBooksByShelf("wantToRead");
    const readCollection = this.getBooksByShelf("read");

    const { searchResults } = this.state

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  title="Currently Reading"
                  books={currentlyReadingCollection}
                  onMoveBook={this.moveBook}
                />
                <BookShelf 
                  title="Want To Read"
                  books={wantToReadCollection}
                  onMoveBook={this.moveBook}
                />
                <BookShelf 
                  title="Read"
                  books={readCollection}
                  onMoveBook={this.moveBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/add/">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/add/" render={({history}) => (
          <AddBook 
            onAddBook={(book, shelf) => {
              this.moveBook(book, shelf)
              history.push('/')
            }}
            onSearchBooks={this.searchBooks}
            books={searchResults}
            clearSearch={this.clearSearch}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
