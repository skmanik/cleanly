import React, { Component } from "react";
import "./Carousel.css";

export const CarItem = ({children}) => (
	<div className="card cl-carouselcard">
	 	<div className="card-content">
	    	{children}
	 	</div>
	</div>
);

export default CarItem;