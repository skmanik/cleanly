import React, { Component } from "react";
import BarChart from "react-svg-bar-chart";
import Tooltip from "react-simple-tooltip";
import { Details, DonutChart, Table, Row } from "../../components/Details";
import { Comment, FormBtn, TextArea, Description } from "../../components/Comments";
import API from "../../utils/API";
import "./Detail.css";

class Detail extends Component {

  state = {
    name: "",
    address: "",
    idFacility: 0,
    average: 0,
    violationDescription: [],
    totalFacilities: [],
    point: null,
    tooltipTrigger: null,
    comment: "",
    totalComments: [],
    photo: ""
  };

  componentDidMount() {
    this.getFacilityById();
  };

  getFacilityById() {
    this.setState({ idFacility: this.props.match.params.id });
    API.findById(this.props.match.params.id)
      .then(res => {

        console.log(res.data.violationDescription);

        this.setState({
          name: res.data.name,
          address: res.data.address,
          average: res.data.average,
          violationDescription: res.data.violationDescription,
        }, () => {
          this.totalFacilities();
          this.loadComments();
          this.getPhoto();
        });
      })
      .catch(err => console.log(err));

  }

  totalFacilities() {
    const name = this.state.name;
    API.findByName(name, this.state.idFacility)
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

  getPhoto() {
    const name = this.state.name;
    API.findPhotoByName(this.state.name)
      .then(res => {

        const info = JSON.parse(res.data);

        for (let item = 0; item < info.businesses.length; item++) {
          if (info.businesses[item].image_url != " ") {
            this.setState({ photo: info.businesses[item].image_url });
            break;
          }
        }

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

  handleInputChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.comment) {
      API.saveComment({
        idFacility: this.state.idFacility,
        comment: this.state.comment
      })
        .then(res => this.loadComments())
        .catch(err => console.log(err));
    }

    this.setState({
      comment: ""
    })
  };

  loadComments = () => {
    API.findCommentByIdFacility(this.state.idFacility)
      .then(res => {
        this.setState({ totalComments: res.data })
      })
      .catch(err => console.log(err));
  };

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
                       <div className="cl-facilityrating box">
                          <h1 className="title has-text-centered is-size-4">Cleanly Score</h1>
                          <DonutChart value={this.state.average} size={200} strokewidth={20} />
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
                              viewBoxHeight={550}
                              barsColor={"#6f6e88"} />
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
           <div className="container">
                <div className="extrapadding">
                    <h2 className="title is-size-4">Leave a comment!</h2>

                    {this.state.totalComments.map(description => (
                      <Comment key={description._id}>
                        <Description key={description._id}>
                          {description.comment}
                        </Description>
                      </Comment>
                    ))}

                    <article className="media">
                      <div className="media-content">
                        <TextArea className="textarea" placeholder="Add a comment..." value={this.state.comment} onChange={this.handleInputChange} />
                        <FormBtn onClick={this.handleFormSubmit} />
                      </div>
                    </article>
                </div>
           </div>
        </section>
      </div>
    )
  };
}

export default Detail;