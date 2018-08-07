import React, { Component } from "react";
import BarChart from "react-svg-bar-chart"
import Tooltip from "react-simple-tooltip"
import { Details, DonutChart, Table, Row, Image } from "../../components/Details";
import { Comment, FormBtn, TextArea, Description } from "../../components/Comments";
import API from "../../utils/API";

import "./Detail.css";


class Detail extends Component {

  state = {
    name: "",
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
        this.setState({
          name: res.data.name,
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
        <section className="hero is-primary">
          <div className="hero-body">
          </div>
        </section>
        <section className="main section">
          <div className="container">


            <div className="columns">
              <div className="column is-half">
                <Image src={this.state.photo} alt={this.state.photo} />
                <Details>
                  <h1 className="title">{this.state.name}</h1>
                </Details>
              </div>
              <div className="column is-half">
                <DonutChart value={this.state.average} />
              </div>
            </div>

            <div className="columns">
              <div className="column is-half">
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  {this.state.tooltipTrigger ? (
                    <Tooltip
                      fixed
                      placement="center"
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
                      content={this.state.point.address + "  " + this.state.point.score + "%"}
                    />
                  ) : null}
                  <h2 className="title">Other facilities</h2>
                  <BarChart data={this.state.totalFacilities} onHover={this.handlePointHover}
                    labelsVisible={false}
                    gridVisible={false}
                    axisOpacity={0.5} />
                </div>
              </div>
              <div className="column is-half">
                <h2 className="title">Violation Description</h2>
                <Table>
                  {this.state.violationDescription.map(violation => (
                    <Row key={violation.inspection_id}>
                      {violation.violation_description}
                    </Row>
                  ))}
                </Table>
              </div>
            </div>


            <h2 className="title">Comments</h2>

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
        </section>
      </div>
    )
  };
}

export default Detail;