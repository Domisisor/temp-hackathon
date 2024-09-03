import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <div className="main-page">
        <nav id="navbar">
          <h1 className="logo">
            <img
              src="https://www.ubs.com/etc/designs/fit/img/UBS_Logo_Semibold.svg" // Replace with your image URL
              alt="UBS Hunt Logo"
              className="logo-image"
            />
            {/* Optionally, you can add a span or text below the image if needed */}
            <span className="logo-text">  Hunt</span>
          </h1>

          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/post-job">Post Job</Link>
            </li>
            <li>
              <Link to="/saved-job">Saved Job</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
