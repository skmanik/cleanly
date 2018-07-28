import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import Card from "../../components/Card";
import API from "../../utils/API";
import "./Results.css";

const Results = () => (
	<div>
		<section className="hero is-primary">
			<div className="hero-body">
				<div className="container">
					<h1 className="title">Results List</h1>
					{/* A search bar like the one on the home page */}
					<Search />
				</div>
			</div>
		</section>
		<section className="main section">
			<div className="container">
				{/* Cards will be generated here, here's an example */}
				<Card />
				<Card />
				<Card />
			</div>
		</section>
	</div>
);

export default Results;
