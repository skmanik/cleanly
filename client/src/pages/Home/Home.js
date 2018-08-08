import React, { Component } from "react";
import Search from "../../components/Search";
import { Carousel, CarItem } from "../../components/Carousel";
import API from "../../utils/API";

class Home extends Component {
	state = {
		facilities: [],
		facilitiesPhoto: []
	}

	componentDidMount() {
		this.findTop();
	};

	searchForBusiness = query => {
        const searchPath = "/results?q=" + query;
        const encodedPath = encodeURI(searchPath);

        // this just lets the user know in URL bar what's being searched
        this.props.history.push(encodedPath);
    }

	findTop() {
		API.findTop()
			.then(res => {
				this.setState({
					facilities: res.data,
				}, () => {
					//console.log(this.state.facilities);
					//this.getPhoto();
				});
			})
			.catch(err => console.log(err));
	}	

	render() {
		return (
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
				<section className="section main">
					<Carousel>
						{this.state.facilities.map(facility => (
							<CarItem key={facility.id}>
								<p className="title is-4">{facility.name}</p>
								<p className="subtitle is-6">{facility.business_address}, {facility.business_city}, {facility.business_state}</p>
								 <img src={facility.photo} alt={facility.photo} /> 
							</CarItem>
						))}
					</Carousel>
				</section>
			</div>
		);
	}
}

export default Home;