import React, { Component } from "react";
import { Details, DonutChart } from "../../components/Details";



class Results extends Component {

    state = {
        options: {
            title: "My Daily Activities",
            pieHole: 27,
            is3D: true
        }
    };


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
