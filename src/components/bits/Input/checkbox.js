import React from "react";
import "./checkbox.scss";
import PropTypes from "prop-types";

const Checkbox = props => {
  /**
   * Checkbox input change handler
   * Handles checkbox cases where we expect the checkbox's state to be an array of currently checked values
   * @param {String} inputKey
   * @param {Event} event The Event object
   * @param {Function} handler Handler function returned by a custom hook from props.registerState
   */
  const checkboxHandler = e => {
    //we make a copy (avoid referencing original array)
    //that we'll set as the new value at the end of this function
    let copy = [...props.state[props.inputKey]];
    //if checkbox is about to be checked
    if (event.target.checked) {
      //push the value to the copied array
      copy.push(event.target.value);
    } else {
      //if checkbox is about to be unchecked
      // we also want to remove that value from the copied array
      copy = copy.filter(val => val !== event.target.value);
    }

    //handler will now set the new array as the new value of this inputKey's state
    props.stateHandler(props.inputKey, copy);
  };

  return (
    <ul className="Checkbox">
      {props.elementConfig.options.map(option => {
        return (
          <li key={option.value || option} className="Checkbox__li">
            <input
              id={option.value || option}
              className="Checkbox__input"
              type="checkbox"
              value={option.value || option.toLowerCase().replace(" ", "-")}
              checked={
                props.state[props.inputKey].includes(
                  option.value || option.toLowerCase().replace(" ", "-")
                ) ||
                option.value === props.initialValue ||
                option === props.initialValue
              }
              onChange={checkboxHandler}
              onFocus={props.focusHandler}
              onBlur={props.focusHandler}
            />
            <label htmlFor={option.value || option}>
              {option.label || option}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

Checkbox.propTypes = {
  elementConfig: PropTypes.shape({
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string
        })
      )
    ]).isRequired
  }),
  focusHandler: PropTypes.func,
  initialValue: PropTypes.string,
  inputKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  state: PropTypes.object.isRequired,
  stateHandler: PropTypes.func.isRequired
};

export default Checkbox;
