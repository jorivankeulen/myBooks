import React, {Component} from 'react'

class BookMenu extends Component {

    handleChange = (event) => {
        this.props.onMoveBook(this.props.book, event.target.value)
    }
    
    render() {
        const { shelf } = this.props
        return(
            <div className="book-shelf-changer">
                <select 
                    defaultValue={shelf ? shelf : "none"}
                    onChange={this.handleChange}>
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead">
                    Want to Read
                </option>
                <option value="read">
                    Read
                </option>
                <option value="none">
                    None
                </option>
                </select>
            </div>
    
        )
    }

}

export default BookMenu