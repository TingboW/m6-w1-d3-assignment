import { Component } from 'react';
// import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './BookList';
import BookEdit from './BookEdit';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* ::Bypass Home component::
                <Route path='/' exact={true} component={Home}/>
                <Route path='/books' exact={true} component={BookList}/> */}
          <Route path='/' exact={true} component={BookList}/>
          <Route path='/:id' component={BookEdit}/> 
        </Routes>
      </Router>
    )
  }
}

export default App;