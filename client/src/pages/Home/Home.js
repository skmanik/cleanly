import React, { Component } from "react";
import Search from "../../components/Search";
import { Carousel, CarItem } from "../../components/Carousel";
import API from "../../utils/API";
import "./Home.css";

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
				<section className="hero is-info is-transparent is-medium" id="cl-banner">
					<div className="cl-bannerimg"></div>
					<div className="cl-banneroverlay"></div>
					<div className="hero-body">
						<div className="container">
						   <h1 className="title has-text-centered is-size-3 cl-bannertext">
						      Dining out at a trendy restaurant? See how clean it is first!
						   </h1>
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