import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

import Controls from "./Controls";

const useStyles = makeStyles({
  modifier: {
    backgroundColor: "#51c255",
    color: "#fff",
  },
});

const Save = (props) => {
  //Allow override by passing the parent's props. Overriding must be done through modifiers
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
      classes={{ modifier: `${props.classes || classes.modifier}` }}
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
