import React, { Component } from "react";
import { Details, DonutChart, Table, Row } from "../../components/Details";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Card from "../../components/Card";
import Popup from "reactjs-popup";
import "./Detail.css";

class Detail extends Component {

  state = {
    name: "",
    average: 0,
    violationDescription: [],
    open: false,
    facility1: 1,
    facility2: 2,
    facility3: 3,
  };

  componentDidMount() {
    API.findById(this.props.match.params.id)
      .then(res => {
        this.setState({ name: res.data.name });
        this.setState({ average: res.data.average });
        this.setState({ violationDescription: res.data.violationDescription });
      })
      .catch(err => console.log(err));

  }

  openModal = (data) => {
    this.setState({
      open: true,
      popupData: data,
    });
  };
  closeModal = () => {
    this.setState({ open: false });
  };



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
        <section className="main section">
          <div className="container" onClick={() => this.openModal(this.state.facility1)}>
            {/* Cards will be generated here, here's an example */}
            <Card />
          </div>

          <div className="container"  onClick={() => this.openModal(this.state.facility2)} >
            <Card />
          </div>

          <div className="container"  onClick={() => this.openModal(this.state.facility3)}>
            <Card />
          </div>
        </section>
        <div>
          {
            this.state.open ? (
              <div style={{position:"absolute"}}>
                <div onClick={this.closeModal} style={{position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100vh", width: "100vw", top: 0, left: 0}}></div>
                <div style={{position: "fixed", backgroundColor: "white", top: "40%"}}>
                {this.state.popupData}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                doloribus. Odit, aut.
                </div>
              </div>

            ) : null
          }
          {/*
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="modal">
              <a className="close" onClick={this.closeModal}>
                &times;
              </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
              omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
              ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
              doloribus. Odit, aut.
            </div>
          </Popup>
          */}
        </div>
      </div>
    )
  };
}

export default Detail;