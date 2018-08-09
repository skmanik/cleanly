import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import queryString from "query-string";
import Search from "../../components/Search";
import Card from "../../components/Card";
import API from "../../utils/API";
import "./Results.css";

class Results extends Component {
	state = {
		businesses: [],
		currentViewBusinesses: [],
		pageCount: 0
	};

	componentDidMount() {
		// API stuff
		console.log("Results page!");

		// if there is a query, then we call searchForBusiness with that query
		const query = queryString.parse(this.props.location.search).q;

		if (query) {
			this.searchForBusiness(query);
		}
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
			this.setState({ businesses: res.data, pageCount: Math.ceil(res.data.length / 10) });
			this.handlePageClick({ selected: 0 });
			console.log(res.data);
		})
		.catch(err => console.log(err));
	};

	// react paginate stuff
	handlePageClick = event => {
		const page = event.selected;
		const lowerBound = page * 10;
		const upperBound = (page * 10) + 9;
		const businesses = this.state.businesses.slice(lowerBound, upperBound);
		console.log("This is the page", page);

		this.setState({ currentViewBusinesses: businesses });
	}

	render() {
		return (
			<div>
				<section className="hero is-info is-transparent" id="cl-resultsbanner">
					<div className="cl-bannerimg"></div>
					<div className="cl-banneroverlay"></div>
					<div className="hero-body">
						<div className="container">
						   <Search onSearch={this.searchForBusiness} />
						</div>
					</div>
		      	</section>
				<section className="main section">
					<div className="container">
						<div className="extrapadding">
							<h1 className="title is-size-4 extraborder" id="cl-srtitle">Search Results</h1>
							{this.props.location.search ? (null) : (
								<p><span class="cl-emoji">🧐</span> It seems you haven't searched anything yet... Give it a shot!</p>
							)}

							{/* Cards will be generated here */}
							{this.state.currentViewBusinesses.map(business => (
								<Card key={business.id} business={business} />
							))}

							{this.props.location.search ? (
								<ReactPaginate 
									previousLabel={"«   previous"}
		                       		nextLabel={"next   »"}
		                       		breakLabel={<a href="">...</a>}
		                       		breakClassName={"break-me"}
		                       		pageCount={this.state.pageCount}
		                       		marginPagesDisplayed={2}
		                  		 	pageRangeDisplayed={5}
		                       		onPageChange={this.handlePageClick}
		                       		containerClassName={"pagination"}
		                       		subContainerClassName={"pages pagination"}
		                       		activeClassName={"active"} 
	                   			/>
							) : (null)}
						</div>
					</div>
				</section>
			</div>
		);
	};
}

export default Results;
