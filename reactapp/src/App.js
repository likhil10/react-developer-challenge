import React, { Component } from 'react';


const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
        console.log("hello from constructor", this.state.items);
    }

    componentDidMount() {
        fetch(url).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                    }, ()=> console.log("hello",this.state.items));
                    console.log("res", result);
                },
                (error) => {
                    console.log("error", error);
                }
            )
    }

    render() {
        console.log("hello from render");
        return (
            <div>
                <p>Hello world</p>
            </div>
        );
    }
}
export default App;