import React, {Component} from 'react'
import { Link } from "react-router-dom"
import Book from './Book'

class AddBook extends Component {

    state = {
        query: ''
    }    

    componentDidMount() {
        this.setState({query: ''})
        this.props.clearSearch()
    }

    handleChange = (query) => {
        this.setState(() => ({
            query: query
        }))
        this.props.onSearchBooks(query)
    }

    render(){
        // const books = []
        const { query } = this.state
        const { onAddBook, books } = this.props
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        value={query} 
                        onChange={(event) => this.handleChange(event.target.value)}
                        type="text" 
                        placeholder="Search by title or author"/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book 
                            key={book.id}
                            book={book}
                            onMoveBook={onAddBook}
                        />
                    ))}

                </ol>
                </div>
            </div>            
        )
    }
}

export default AddBook