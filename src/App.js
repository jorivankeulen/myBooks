import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import AddBook from './AddBook'
import { Route, Link } from "react-router-dom"

class BooksApp extends React.Component {
  state = {
    books: [],
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

  moveBook = (book, shelf) => {
    let id = book.id
   
    BooksAPI.update(book, shelf).then((books) => {
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
        <Route path="/add/" component={AddBook} />
      </div>
    )
  }
}

export default BooksApp
