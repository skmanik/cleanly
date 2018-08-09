import React from "react";
import "./Jumbotron.css";

const Jumbotron = () => (
    <section className="hero is-info is-transparent is-medium cl-banner">
		 <div className="cl-bannerimg"></div>
		 <div className="cl-banneroverlay"></div>
		 <div className="hero-body">
		    <div className="container">
		       <h1 className="title has-text-centered is-size-3 cl-bannertext">
		          Dining out at a trendy restaurant? See how clean it is first!
		       </h1>
		   		{/* search component goes here... */}
		    </div>
		 </div>
	</section>
);

export default Jumbotron;