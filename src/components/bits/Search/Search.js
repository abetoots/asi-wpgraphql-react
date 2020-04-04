import React, { useRef } from "react";
import styles from "./Search.module.scss";
import PropTypes from "prop-types";

import Button from "@Bits/Button/Button";

import { exposeStylesWillReplace } from "@Styles/api";

//Generate a hook. Consume to generate the styles then apply to the component
//When consumed with props, behind the scenes it is only concerned with props.classes.
//Only keys we expose below are overrideable. Existing styles are REPLACED with exposeStylesWillReplace()
const useStyles = exposeStylesWillReplace({
  button: styles.Search__button,
  input: styles.Search__input,
  tooltip: styles.Search__tooltip,
});

const Search = (props) => {
  //Classes are meant to be replaced or merged depending on what you set above
  const classes = useStyles(props);
  //Default styles
  const {
    Search,
    Search__label,
    Search__icon,
    Search__btnText,
    _hidden,
  } = styles;

  const parent = useRef(null);

  //TODO handle these
  const focusHandler = (e) => {
    if (e.type === "focus") {
      e.target.classList.add("_focused");
      parent.current.classList.add("_focused");
    } else {
      e.target.classList.remove("_focused");
      parent.current.classList.remove("_focused");
    }
  };

  let tooltip;
  if (props.tooltip) {
    tooltip = <span className={classes.tooltip}>{props.tooltip}</span>;
  }

  return (
    <form className={Search} onSubmit={props.handleSubmit} ref={parent}>
      <label
        id={props.label.toLowerCase().replace(/\s/g, "-")}
        className={`${Search__label} ${props.showLabel ? "" : _hidden}`}
      >
        {props.label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
          className={classes.input}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          onFocus={focusHandler}
          onBlur={focusHandler}
        />
        <Button classes={{ root: classes.button }} type="submit">
          <div className={Search__icon}>{props.icon}</div>
          <span
            className={`${Search__btnText} ${props.showBtnText ? "" : _hidden}`}
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
  enableAutoResults: PropTypes.bool,
};

export default Search;
