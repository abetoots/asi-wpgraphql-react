import React from "react";
import "./SvgButtons.scss";

import PropTypes from "prop-types";
import Button from "../UI/Button/Button";

const SvgButtons = props => (
  <div className="SvgButtons">
    {props.config.map(item => (
      <div className="SvgButtons__slot" key={item.value || item.label}>
        <Button
          className="SvgButtons__button"
          onClick={e => props.handleClick(e, item.value || item.label)}
        >
          <img className="SvgButtons__image" src={item.src} alt={item.label} />
          <h5 className="SvgButtons__label">{item.label}</h5>
        </Button>
      </div>
    ))}
  </div>
);

SvgButtons.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func
};

export default SvgButtons;
