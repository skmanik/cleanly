import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
	state = {
		name: "",
		address: "",
		rating: 0
	};

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
			<a href={"results/" + this.props.business.id}>
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
									<strong className="title is-4">{this.state.name}</strong>
									<br />
									<small>{this.state.address}, San Francisco, CA</small>
									<br />
									<span className="result-rating">Rating: {this.state.rating}</span>
								</p>
							</div>
						</div>
					</article>
				</div>
			</a>
		);
	};
}

export default Card;
