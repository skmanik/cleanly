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
				<section className="hero is-info is-transparent is-medium cl-banner">
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
		      		<div class="container">
		      			<h1 className="title is-size-4 cl-hometitle">High-scoring businesses on Cleanly</h1>
	      			</div>
					<Carousel>
						{this.state.facilities.map(facility => (
							<a href={"results/" + facility.business_id}>
								<CarItem key={facility.id}>
									<div className="cl-carbgimg">
										<div className="cl-realcarbgimg" style={{ background: "url(" + facility.photo + ") 100% 100% / cover" }}></div>
									</div>
									<p className="title is-5 cl-cartitle">{facility.name}</p>
									<p className="subtitle is-6 cl-carsubtitle"><i class="fas fa-map-marker-alt"></i> <strong>{facility.business_address}</strong>, {facility.business_city}, {facility.business_state}</p>
								</CarItem>
							</a>
						))}
					</Carousel>
				</section>
	      	</div>
		);
	}
}

export default Home;