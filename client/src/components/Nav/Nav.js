import React from "react";
import "./Nav.css";
import logo from './logo.svg';

const Nav = () => (
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation" id="cl-nav">
     <div className="container">
        <div className="navbar-brand">
        	<a className="navbar-item" id="cl-logo" href="/">
        		<img src={logo} alt="cleanly" />
           		<strong>Cleanly</strong>
           	</a>
        </div>
        <div className="navbar-menu">
           <div className="navbar-end">
              <a className="navbar-item" href="/">Home</a>
              <a className="navbar-item" href="/">About</a>
              <a className="navbar-item button" href="/results" id="cl-navsearch">Search</a>
           </div>
        </div>
     </div>
    </nav>
);

export default Nav;