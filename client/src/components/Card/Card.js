import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
	state = {
		name: "",
		address: "",
		rating: 0
	};

	// functions
	// go here
	componentDidMount() {
		console.log(this.props.business);

		this.setState({ name: this.props.business.name })
		this.setState({ address: this.props.business.address })
		this.setState({ rating: this.computeAverage(this.props.business.scores) })
	};

	computeAverage = scores => {
		let accum = 0;
		let count = 0;

		for (let inspection_id in scores) {
			const score = parseInt(scores[inspection_id]);

			accum += score;
			count++;
		}

		return (accum / count).toFixed(2);
	}

	render() {
		return(
			<div>
				<div className="box result-card">
					<article className="media">
						<div className="media-left">
							<figure className="image is-96x96">
								<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
							</figure>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<a href="#">
										<strong className="title is-4">{this.state.name}</strong>
									</a>
									<br />
									<small>{this.state.address}</small>
									<br />
									<span className="result-rating">Rating: {this.state.rating}</span>
								</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		);
	};
}

// const Card = () => (
	// <div>
	// 	<div className="box result-card">
	// 		<article className="media">
	// 			<div className="media-left">
	// 				<figure className="image is-96x96">
	// 					<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
	// 				</figure>
	// 			</div>
	// 			<div className="media-content">
	// 				<div className="content">
	// 					<p>
	// 						<a href="#">
	// 							<strong className="title is-4">Restaurant Name</strong>
	// 						</a>
	// 						<br />
	// 						<small>1234 Location Street, Placeholder City</small>
	// 						<br />
	// 						<span className="result-rating">Rating: </span>
	// 					</p>
	// 				</div>
	// 			</div>
	// 		</article>
	// 	</div>
	// </div>
// );

export default Card;
