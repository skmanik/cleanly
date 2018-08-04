import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import API from "../../utils/API";

class Home extends Component {
	state = {}

	searchForBusiness = query => {
		const searchPath = "/results?q=" + query;
		const encodedPath = encodeURI(searchPath);

		// this just lets the user know in URL bar what's being searched
		this.props.history.push(encodedPath);
	}

	render() {
		return(
			<div>
			  	<section className="hero is-primary is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Cleanly</h1>
							{/* A search bar that sends user to results page */}
							<Search onSearch={this.searchForBusiness} />
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Home;