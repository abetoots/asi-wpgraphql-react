import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Button.scss";

//Custom button that always behaves as type:'button' since buttons behave as type="submit" inside a form if type is missing
// eslint-disable-next-line react/display-name
const Button = forwardRef((props, ref) => (
  <button
    {...props}
    ref={ref}
    type={props.type || "button"}
    className={`Button ${props.className}`}
    onClick={props.onClick}
  >
    {props.children}
  </button>
));

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
