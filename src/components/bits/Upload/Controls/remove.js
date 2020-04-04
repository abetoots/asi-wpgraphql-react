import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

//Components
import Controls from "./Controls";

//Generate a hook. Consume to generate the styles then apply to the component
const useStyles = makeStyles({
  modifier: {
    backgroundColor: "rgb(220, 0, 78)",
    color: "#fff",
  },
});

const Remove = (props) => {
  //Allow override by passing the parent's props. Overriding must be done through modifiers
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text depending on btnText.
  let children = <span>{props.btnText}</span>;
  /**
   * Override
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
      onClick={props.handleRemove}
      aria-label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Remove.defaultProps = {
  btnText: "Remove",
};

Remove.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  hasFileBtnText: PropTypes.string,
  rootModifiers: PropTypes.object,
  state: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
      .isRequired,
    preview: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default Remove;
