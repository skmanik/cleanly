import React from "react";

const Card = () => (
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
								<strong className="title is-4">Restaurant Name</strong>
							</a>
							<br />
							<small>1234 Location Street, Placeholder City</small>
							<br />
							<span className="result-rating">Rating: </span>
						</p>
					</div>
				</div>
			</article>
		</div>
	</div>
);

export default Card;
