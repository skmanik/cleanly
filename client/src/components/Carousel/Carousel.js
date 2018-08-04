import React, { Component } from "react";
import CarItem from "./CarItem.js";
import "./Carousel.css";

class Carousel extends Component {
	state = {

	};

	render() {
		return(
			<div className="container">
				<div className="cl-carouselwrap">
					<div className="cl-carouselstrip">
						{/* temporary, will put these arrow svgs in their own section later, just testing rn */}
						<div className="cl-arrowbutton" id="cl-arrowright"></div>
		          		<div className="cl-arrowbutton" id="cl-arrowleft"></div>
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