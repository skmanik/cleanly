import React, { Component } from "react";
import "./Search.css";

class Search extends Component {

	state = {
		input: "",
	};

	// input change handler
	onInput = event => this.setState({
		input: event.target.value
	});

	// submit handler
	onSearch = event => {
		event.preventDefault();
		console.log("I added an on click!");
		// this.props.history.push("/results?q=Hello");

		this.props.onSubmit(this.state.input);
	};

	render() {
		return (
			<div>
				<div className="field has-addons">
					<div className="control search-container">
						<input
							className="input"
							type="text"
							placeholder="Enter a facility name..."
							onChange={this.onInput}
						/>
					</div>
					<div className="control">
						<a onClick={this.onSearch} className="button is-info">
							Search
						</a>
					</div>
				</div>
			</div>
		);
	};
}

export default Search;
