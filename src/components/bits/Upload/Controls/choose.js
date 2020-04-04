import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

//Components
import Controls from "./Controls";

//Misc
import { isFile } from "@Shared/helper-funcs";

//Generate a hook. Consume to generate the styles then apply to the component
const useStyles = makeStyles({
  modifier: {
    backgroundColor: "#4285f4",
    color: "#fff",
  },
});

const Choose = (props) => {
  //Allow override by passing the parent's props. Overriding must be done through modifiers
  const classes = useStyles(props);

  //Children
  //Default: Single child <span/> with text changing depending on btnText and hasFileBtnTxt.
  let children = (
    <span>
      {isFile(props.state.file) ? props.hasFileBtnText : props.btnText}
    </span>
  );
  /**
   * Override
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText and hasFileBtnTxt. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = isFile(props.state.file) ? props.hasFileBtnText : props.btnText;
    children = props.children;
  }

  /**
   * Upload button handler
   * Problem: We can't style <input type="file"/> buttons through css
   * Solution: We delegate it to a different button we can style which simply triggers a click on <input type="file"/>
   */
  const chooseFileHandler = (e, inputRef) => {
    inputRef.current.click();
  };

  return (
    <Controls
      classes={{ modifier: `${props.classes || classes.modifier}` }}
      onClick={(e) => chooseFileHandler(e, props.inputRef)}
      aria-label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Choose.defaultProps = {
  btnText: "Choose File",
  hasFileBtnText: "hasFileBtnText",
};

Choose.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.string,
  inputRef: PropTypes.object.isRequired,
  hasFileBtnText: PropTypes.string,
  state: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
      .isRequired,
    preview: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default Choose;
