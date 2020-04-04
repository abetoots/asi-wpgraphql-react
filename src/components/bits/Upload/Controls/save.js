import React from "react";
import PropTypes from "prop-types";

import Controls from "./Controls";

//Misc
import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */

const useStyles = makeStyles({
  modifier: {
    backgroundColor: "#51c255",
    color: "#fff",
  },
});

const Save = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text depending on btnText.
  let children = <span>{props.btnText}</span>;
  //Override
  /**
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = props.btnText;
    children = props.children;
  }

  return (
    <Controls
      classes={{
        modifier: `${props.classes || classes.modifier}`,
      }}
      onClick={props.handleSave}
      aria-label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Save.defaultProps = {
  btnText: "Save",
};

Save.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  hasFileBtnText: PropTypes.string,
};

export default Save;
