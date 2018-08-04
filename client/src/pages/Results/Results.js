import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import Card from "../../components/Card";
import API from "../../utils/API";
import "./Results.css";

class Results extends Component {
	state = {
		businesses: [],
	};

	componentDidMount() {
		// API stuff
		console.log("Results page!");

	};

	searchForBusiness = query => {
		const searchPath = "/results?q=" + query;
		const encodedPath = encodeURI(searchPath);

		// this just lets the user know in URL bar what's being searched
		this.props.history.push(encodedPath);

		this.updateResults(query);
	};

	updateResults = query => {
		console.log("Results are being updated");

		API.findByQuery(query)
		.then(res => {
			this.setState({ businesses: res.data })
			console.log(res.data);
		})
		.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<section className="hero is-primary">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Results List</h1>
							{/* A search bar like the one on the home page */}
							<Search onSearch={this.searchForBusiness} />
						</div>
					</div>
				</section>
				<section className="main section">
					<div className="container">
						{/* Cards will be generated here */}
						{this.state.businesses.map(business => (
							<Card key={business.id} business={business} />
						))}
					</div>
				</section>
			</div>
		);
	};
}

export default Results;
