import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox"
import Scroll from "./Scroll.js"
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: "",
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}) )
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.includes(this.state.searchField)
        })
        if (this.state.robots.length === 0) {
            return <div className="tc">
                <h1 className="tc">Loading</h1>
            </div>
        }
        return (
            <div className="tc">
                <h1 className="f1">Robot friends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        )
    }
}

export default App
