import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
// import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isLoading: true
        };
    }
    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/books')
            .then(response => response.json())
            .then(data => this.setState({books: data, isLoading: false}));
    }
    removeBk = async (id) => {
        await fetch(`/api/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            console.log("Remove Done!");
            //update book state minus removed item
            let updatedBooks = 
                [...this.state.books].filter(i => i._id !== id);
            this.setState({books: updatedBooks});
    }
    render() {
        const {books, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;            
        }
        const bookList = books.map(book => {
            return <tr key={book._id}>
                <td style={{whiteSpace: 'nowrap'}}>{book.title}</td>
                <td>{book.author}</td>
                <td>
                <ButtonGroup>
                    <Button
                        size="sm"
                        color="info"
                        tag={Link}
                        to={"/" + book._id}
                    >Edit</Button>
                    <Button
                        size="sm"
                        color="warning"
                        onClick={() => this.removeBk(book._id)}
                    >Delete</Button>
                </ButtonGroup>
                </td>
            </tr>
        });

        return(
            <div>
                {/* <AppNavbar /> */}
                <Container fluid>
                <div className="float-right">
                    <Button
                    color="primary"
                    className='my-4'
                    tag={Link}
                    to="/new"
                    >Add Book</Button>
                </div>
                <h3>Book List</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="40%">Book Title</th>
                            <th width="30%">Author</th>
                            <th width="30%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </Table>
                </Container>
            </div>
        )
}
}

export default BookList;