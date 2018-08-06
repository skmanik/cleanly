import React, { Component } from "react";
import CarItem from "./CarItem.js";
import "./Carousel.css";

class Carousel extends Component {
	state = {};

	scrollRight = () => {
		console.log("Going somewhere!");
	}

	scrollLeft = () => {
		console.log("Going somewhere!");
	}

	sideScroll = (element, direction, speed, distance, step) => {
		let scrollAmount = 0;

		const slideTimer = setInterval(function(){
			if (direction == "left") {
				element.scrollLeft -= step;
			} else {
				element.scrollLeft += step;
			}
			scrollAmount += step;
			if (scrollAmount >= distance) {
				window.clearInterval(slideTimer);
			}
		}, speed);
	}

	render() {
		return(
			<div className="container">
				<div className="cl-carouselwrap">
					<div className="cl-carouselstrip">
						{/* temporary, will put these arrow svgs in their own section later, just testing rn */}
						<div className="cl-arrowbutton" id="cl-arrowright" onClick={this.scrollRight}>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 306 306" xmlSpace="preserve">
								<g>
									<g>
										<polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153">
										</polygon>
									</g>
								</g>
							</svg>
						</div>
		          		<div className="cl-arrowbutton" id="cl-arrowleft" onClick={this.scrollLeft}>
							<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 306 306" xmlSpace="preserve">
								<g>
									<g>
										<polygon points="247.35,270.3 130.05,153 247.35,35.7 211.65,0 58.65,153 211.65,306">
										</polygon>
									</g>
								</g>
							</svg>
		          		</div>
		              	{/* temporary, will put these arrow svgs in their own section later, just testing rn */}

		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
		              	<CarItem />
					</div>
				</div>
			</div>
		)
	}
}

export default Carousel;