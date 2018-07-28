import React from "react";
import "./Search.css";

const Search = () => (
	<div>
		<div className="field has-addons">
		  <div className="control search-container">
		    <input className="input" type="text" placeholder="Enter a facility name..." />
		  </div>
		  <div className="control">
		    <a className="button is-info">
		      Search
		    </a>
		  </div>
		</div>
	</div>
);

export default Search;