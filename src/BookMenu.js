import React from 'react'

const BookMenu = (props) => {
    return(
        <div className="book-shelf-changer">
            <select 
                defaultValue={props.shelf}
                onChange={props.onMoveBook(props.book)}>
            <option value="move" disabled>Move to...</option>
            <option
                value="currentlyReading"
                // onClick={props.onMoveBook(props.book, "currentlyReading")}
            >
                Currently Reading
            </option>
            <option
                value="wantToRead"
                // onClick={props.onMoveBook(props.book, "wantToRead")}
            >
                Want to Read
            </option>
            <option
                value="read"
                // onClick={props.onMoveBook(props.book, "read")}
            >
                Read
            </option>
            <option
                value="none"
                // onClick={props.onMoveBook(props.book, "none")}
            >
                None
            </option>
            </select>
        </div>

    )
}

export default BookMenu