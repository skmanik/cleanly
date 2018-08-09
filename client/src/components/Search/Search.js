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

		this.doSearch();
	};

	// on hitting enter, do search (alternate)
	handleKeyPress = event => {
		if (event.key === "Enter") {
      		console.log("Enter was hit!");

      		this.doSearch();
    	}
	}

	// do search
	doSearch = () => {
		if (this.state.input === "" || this.state.input === null || this.state.input === "undefined") {
			return;
		}

		this.props.onSearch(this.state.input);
	}

	render() {
		return (
			<div className="cl-searchcontainer" id="cl-searchformfix">
			  <div className="field has-addons has-addons-right" id="cl-searchform">
			     <p className="control">
			        <span className="select is-medium">
			           <select>
			              <option>Select a county</option>
			              <option>San Francisco</option>
			           </select>
			        </span>
			     </p>
			     <p className="control">
			        <input 
			        	onChange={this.onInput} 
			        	onKeyPress={this.handleKeyPress} 
			        	className="input is-medium"
			        	type="text"
			        	placeholder="Enter a business name..."
			        	id="cl-searchname"
		        	/>
			     </p>
			     <p className="control">
			        <a className="button is-danger is-medium" id="cl-searchsubmit">Let's go!</a>
			     </p>
			  </div>
			</div>
		);
	};
}

export default Search;
