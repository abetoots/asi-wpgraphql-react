import React from "react";
import PropTypes from "prop-types";
import "./textarea.scss";

const TextArea = (props) => {
  return (
    <textarea
      className="Textarea"
      {...props.elementConfig}
      value={props.state[props.inputKey]}
      onChange={(event) =>
        props.stateHandler(props.inputKey, event.target.value)
      }
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
      aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
    />
  );
};

TextArea.propTypes = {
  elementConfig: PropTypes.object,
  focusHandler: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default TextArea;
