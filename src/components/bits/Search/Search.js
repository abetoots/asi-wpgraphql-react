import React, { useRef } from "react";
import "./Search.scss";
import PropTypes from "prop-types";

import Button from "../Button/Button";

const Search = props => {
  const parent = useRef(null);

  const focusHandler = e => {
    if (e.type === "focus") {
      e.target.classList.add("-focused");
      parent.current.classList.add("-focused");
    } else {
      e.target.classList.remove("-focused");
      parent.current.classList.remove("-focused");
    }
  };

  let inputClass = "Search__input";
  if (props.inputClassName) {
    inputClass = props.inputClassName;
  }

  let buttonClass = "Search__button";
  if (props.btnClassName) {
    buttonClass = props.btnClassName;
  }

  let tooltip;
  if (props.tooltip) {
    tooltip = <span className="Search__tooltip">{props.tooltip}</span>;
  }

  //TODO fix id not properly replacing all spaces to hyphens
  return (
    <form className="Search" onSubmit={props.handleSubmit} ref={parent}>
      <label
        id={props.label.toLowerCase().replace(" ", "-")}
        className={`Search__label ${props.showLabel ? "" : "-hidden"}`}
      >
        {props.label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
          className={inputClass}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          onFocus={focusHandler}
          onBlur={focusHandler}
        />
        <Button className={buttonClass} type="submit">
          <div className="Search__icon">{props.icon}</div>
          <span
            className={`Search__btnText ${props.showBtnText ? "" : "-hidden"}`}
          >
            {props.btnText}
          </span>
        </Button>
      </div>
      {tooltip}
      {props.children}
    </form>
  );
};

Search.propTypes = {
  inputClassName: PropTypes.string,
  btnClassName: PropTypes.string,
  showBtnText: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  btnPos: PropTypes.string,
  icon: PropTypes.element,
  tooltip: PropTypes.string,
  handleSubmit: PropTypes.func,
  enableAutoResults: PropTypes.bool
};

export default Search;
