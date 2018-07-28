import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import API from "../../utils/API";

const Home = () => (
  <div>
  	<section className="hero is-primary is-medium">
		<div className="hero-body">
			<div className="container">
				<h1 className="title">Cleanly</h1>
				{/* A search bar that sends user to results page */}
				<Search />
			</div>
		</div>
	</section>
  </div>
);

export default Home;