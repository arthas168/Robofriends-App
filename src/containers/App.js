import React from "react";
import { connect } from 'react-redux';
import CardList from "../ components/CardList";
import SearchBox from "../ components/SearchBox";
import Scroll from '../ components/Scroll';
import "./App.css";
import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  onSearchChange: (event) => dispatch(setSearchField(
    event.target.value
  ))
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: []
    }
  }

  componentDidMount() {
    console.log(this.props.store.getState())
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        return res.json();
      }) 
      .then(users => {
        this.setState({ robots: users });
      });
  }

  render() {
    const {robots} = this.state;
    const {searchField, onSearchChange} = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });

    if (!robots.length) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps,
   mapDispatchToProps)(App);