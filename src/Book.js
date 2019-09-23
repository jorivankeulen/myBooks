import React from 'react'
import BookMenu from './BookMenu'

const Book = (props) => {
    return(
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+props.book.imageLinks.thumbnail+'")' }}></div>
                    <BookMenu 
                        shelf={props.book.shelf}
                        book={props.book}
                        onMoveBook={props.onMoveBook}
                    />
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors}</div>
            </div>
        </li>
    )
}

export default Book