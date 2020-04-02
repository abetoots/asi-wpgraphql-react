import React from "react";
import "./NotFound404.scss";
import { NavLink } from "react-router-dom";

const NotFound404 = props => (
  <div className="NotFound404">
    <p className="NotFound404__subText">
      We can't find what you're looking for.{" "}
      <NavLink to="/">Back to Home</NavLink>{" "}
    </p>
  </div>
);

export default NotFound404;
