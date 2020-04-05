import React from "react";
import PropTypes from "prop-types";
import "./select.scss";

const Select = (props) => {
  return (
    <select
      className="Select"
      value={props.state[props.inputKey] || props.initialValue}
      onChange={(event) =>
        props.stateHandler(props.inputKey, event.target.value)
      }
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
      aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
    >
      {props.elementConfig.options.map((option) => (
        <option
          key={option.value || option}
          value={option.value || option.toLowerCase().replace(/\s/g, "-")}
        >
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  elementConfig: PropTypes.shape({
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    ]).isRequired,
  }),
  focusHandler: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Select;
