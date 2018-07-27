import React, { Component } from "react";
import { Details, DonutChart } from "../../components/Details";



class Results extends Component {

    state = {
        options: {
            title: "My Daily Activities",
            pieHole: 30,
            is3D: true
        }
    };

    componentDidMount() {

        console.log(this.props.match.params.id);
        // API.getBook(this.props.match.params.id)
        //   .then(res => this.setState({ book: res.data }))
        //   .catch(err => console.log(err));
      }

    render() {
        return (
            <div>
                <Details>
                    <h1>{this.state.options.title}</h1>
                </Details>
                <div>
                    <DonutChart value={this.state.options.pieHole} />
                </div>
            </div>
        )
    };
}


export default Results;
