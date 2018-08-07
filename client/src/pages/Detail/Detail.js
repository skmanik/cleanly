import React, { Component } from "react";
import BarChart from "react-svg-bar-chart";
import Tooltip from "react-simple-tooltip";
import { Details, DonutChart, Table, Row } from "../../components/Details";
// import { BarChart } from 'react-native-chart-kit'
import API from "../../utils/API";
import "./Detail.css";

class Detail extends Component {

  state = {
    name: "",
    average: 0,
    violationDescription: [],
    totalFacilities: [],
    point: null,
    tooltipTrigger: null
  };

  componentDidMount() {
    this.getFacilityById();
  };

  getFacilityById() {
    API.findById(this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          average: res.data.average,
          violationDescription: res.data.violationDescription,
        }, () => {
          this.totalFacilities();

        });
        // name still be null
      })
      .catch(err => console.log(err));

    this.totalFacilities();

  }

  totalFacilities() {
    console.log("name", this.state.name);
    API.findByName(this.state.name)
      .then(res => {

        const info = res.data;

        let data = []
        for (let x = 0; x < info.length; x++) {

          const address = info[x].business_address + ", " + info[x].business_city + ", " + info[x].business_state;
          data.push({
            address: address,
            score: info[x].average,
            x: x,
            y: parseInt(info[x].average),
            violation_description: info[x].violation_description,
            active: true
          })
        }
        this.setState({ totalFacilities: data });
      })
      .catch(err => console.log(err));
      
  }

  handlePointHover = (point, e) => {
    if (e) {
      this.setState({
        tooltipTrigger: e.target.getBoundingClientRect(),
        point: point,
      })
    } else {
      this.setState({
        tooltipTrigger: null,
        point: null,
      })
    }
  }

  render() {
    return (
      <div>
        {/* this is the banner */}
        <section className="hero is-info is-transparent" id="cl-banner">
           <div className="cl-bannerimg"></div>
           <div className="cl-banneroverlay"></div>
           <div className="hero-body">
              <div className="container">
                 <h1 className="title has-text-centered is-size-3 cl-bannertext">{this.state.name}</h1>
              </div>
           </div>
        </section>

        {/* this is the content */}
      </div>
    )
  };
}

export default Detail;

/* <Details>
          <h1>{this.state.name}</h1>
        </Details>
        <div>
          <DonutChart value={this.state.average} />
        </div>
        <Table>
          {this.state.violationDescription.map(violation => (
            <Row key={violation.inspection_id}>
              {violation.violation_description}
            </Row>
          ))}
        </Table>
        <div style={{ position: "relative", }}>
          {this.state.tooltipTrigger ? (
            <Tooltip
              fixed
              placement="top"
              radius={10}
              arrow={10}

              style={{
                position: "fixed",
                top: this.state.tooltipTrigger.top + "px",
                left:
                  this.state.tooltipTrigger.left +
                  (this.state.tooltipTrigger.right - this.state.tooltipTrigger.left) / 2 +
                  "px",
              }}
              content={this.state.point.address + "  " + this.state.point.score+"%"}
            />
          ) : null}
          <BarChart data={this.state.totalFacilities} onHover={this.handlePointHover}
            labelsVisible={false}
            gridVisible={false}
            axisOpacity={0.5} />
        </div>
*/