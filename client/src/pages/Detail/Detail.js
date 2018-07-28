import React, { Component } from "react";
import { Details, DonutChart, Table, Row } from "../../components/Details";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Detail extends Component {

  state = {
    name: "",
    average: 0,
    violationDescription: []
  };

  componentDidMount() {

    // console.log("id", this.props.match.params.id);

    API.findById(this.props.match.params.id)
      .then(res => {

        // console.log("result", res.data);
        this.setState({ name: res.data.name });
        this.setState({ average: res.data.average });
        this.setState({ violationDescription: res.data.violationDescription });

        // console.log("Violation", this.state.violationDescription);
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <Details>
          <h1>{this.state.name}</h1>
        </Details>
        <div>
          <DonutChart value={this.state.average} />
        </div>
        <Table>
          {this.state.violationDescription.map(name => (
            <Row>
              {name}
            </Row>
          ))}
        </Table>
      </div>
    )
  };
}

export default Detail;