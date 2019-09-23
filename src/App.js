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
      this.setState({searchResults: data})
    })
  }

  bookExists = (book) => {
    return this.state.books.some(b => b.id === book.id)
  }

  addBook = (book, shelve) => {
    
  }

  moveBook = (book, shelf) => {
    let id = book.id
    book.shelf = shelf
    BooksAPI.update(book, shelf).then((books) => {
      // this.setState(prevState => ({
      //   books: this.bookExists 
      //     ? prevState.books.map(
      //       book => book.id === id ? { ...book, shelf: shelf} : book
      //     )
      //     : prevState.books.push(book)
      // }))
      this.setState(prevState => ({
        books: !this.bookExists 
          ? prevState.books.push(book)
          : this.state.books
      }))
      this.setState(prevState => ({
        books: prevState.books.map(
          book => book.id === id ? { ...book, shelf: shelf} : book
        )
      }))

      
    })
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
            
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
