import React, { Component } from "react";
import BarChart from "react-svg-bar-chart";
import Tooltip from "react-simple-tooltip";
import { Details, DonutChart, Table, Row } from "../../components/Details";
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
      console.log(e.target.getBoundingClientRect());
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
        <section className="hero is-info is-transparent" id="cl-detailsbanner">
           <div className="cl-bannerimg"></div>
           <div className="cl-banneroverlay"></div>
           <div className="hero-body">
              <div className="container">
                 <h1 className="title has-text-centered is-size-3" id="cl-detailsbannertext">{this.state.name}</h1>
              </div>
           </div>
        </section>

        {/* this is the content */}
        <section className="section main">
          <div className="container">
              <div className="cl-detailsholder">
                 <div className="columns">
                    <div className="column is-two-thirds">
                       <div className="cl-facilitybanner cl-box-shadow">
                          <div className="cl-facilitybannerimg"></div>
                       </div>
                    </div>
                    <div className="column">
                       <div className="cl-facilityrating cl-boxshadow">
                          <h1 className="title has-text-centered is-size-4">Cleanly Score</h1>
                          <DonutChart value={this.state.average} />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           <div className="container">
              <div className="cl-risksholder">
                 <div className="columns">
                    <div className="column is-two-fifths">
                       <div className="cl-barchart">
                          <h1 className="title is-size-4">Other scores from this franchise</h1>
                          <div style={{ position: "relative", }}>
                            {this.state.tooltipTrigger ? (
                              <Tooltip
                                placement="top"
                                radius={10}
                                arrow={10}

                                style={{
                                  position: "absolute",
                                  top: this.state.tooltipTrigger.top - 280 + "px",
                                  left: 
                                  this.state.tooltipTrigger.left +
                                  (this.state.tooltipTrigger.right - this.state.tooltipTrigger.left) / 2 +
                                  -90 + 
                                  "px",
                                }}
                                content={this.state.point.address + "  " + this.state.point.score+"%"}
                              />
                            ) : null}
                            <BarChart 
                              data={this.state.totalFacilities} 
                              onHover={this.handlePointHover}
                              labelsVisible={false}
                              gridVisible={false}
                              axisOpacity={0.5}
                              viewBoxHeight={550} />
                          </div>
                       </div>
                    </div>
                    <div className="column">
                       <div className="cl-riskslist">
                          <h1 className="title is-size-4">List of past health violations</h1>
                          <ul className="cl-ulrl">
                            {this.state.violationDescription.map(violation => (
                              <li key={violation.inspection_id}>
                                {violation.violation_description}
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    )
  };
}

export default Detail;