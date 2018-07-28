import React, { Component } from "react";
import { Details, DonutChart, Table, Row } from "../../components/Details";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Detail extends Component {

  // state = {
  //   facilities: {
  //     "name": "El Tomate Restaurant!!!!!!!",
  //     "average": "87.72",
  //     "violetionDescription": [
  //       "Improper storage of equipment utensils or linens",
  //       "Inadequately cleaned or sanitized food contact surfaces",
  //       "Moderate risk vermin infestation",
  //       "Moderate risk food holding temperature",
  //       "Improper cooling methods",
  //       "Unclean nonfood contact surfaces",
  //       "Unclean or degraded floors walls or ceilings",
  //       "Wiping cloths not clean or properly stored or inadequate sanitizer",
  //       "Permit license or inspection report not posted",
  //       "Moderate risk vermin infestation",
  //       "Food safety certificate or food handler card not available",
  //       "Unclean nonfood contact surfaces",
  //       "Wiping cloths not clean or properly stored or inadequate sanitizer",
  //       "Moderate risk vermin infestation",
  //       "Unclean or degraded floors walls or ceilings",
  //       "Moderate risk vermin infestation",
  //       "Improper cooling methods",
  //       "Unclean or degraded floors walls or ceilings"
  //     ]
  //   }
  // };

  state = {
    facilities: {}
  };

  componentDidMount() {

    console.log("id", this.props.match.params.id);

    API.findById(this.props.match.params.id)
      .then(res => this.setState({ facilities: res.body }))
      .catch(err => console.log(err));

    console.log("facility", this.state.facilities);

  }

  render() {
    return (
      <div>
        <Details>
          <h1>{this.state.facilities.name}</h1>
        </Details>
        <div>
          <DonutChart value={this.state.facilities.average} />
        </div>
        <Table>
          {this.state.facilities.violetionDescription.map(facility => (
            <Row>
              <strong>
                {facility}
              </strong>
            </Row>
          ))}
        </Table>
      </div>
    )
  };
}

export default Detail;