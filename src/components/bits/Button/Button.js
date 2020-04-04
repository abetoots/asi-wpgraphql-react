import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  root: {
    fontFamily: "inherit",
    fontSize: "inherit",
    border: 0,
    cursor: "pointer",
  },
});

//Custom button that always behaves as type:'button' since buttons behave as type="submit" inside a form if type is missing
// eslint-disable-next-line react/display-name
const Button = forwardRef((props, ref) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  return (
    <button
      ref={ref}
      type={props.type || "button"}
      className={classes.root}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  rootModifiers: PropTypes.object,
};

export default Button;
