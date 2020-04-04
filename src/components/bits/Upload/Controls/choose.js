import React from "react";
import PropTypes from "prop-types";

//Components
import Controls from "./Controls";

//Misc
import { isFile } from "@Shared/helper-funcs";
import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  modifier: {
    backgroundColor: "#4285f4",
    color: "#fff",
  },
});

/**
 * Component API
 * Overrides:
 *  - btnText: defaults to "Choose Upload"
 *  - hasFileBtnText: when user currently has a file selection, this text takes over btnText. defaults to "Change Upload"
 *
 * @param {*} props
 */
const Choose = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
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
      classes={{
        modifier: `${props.classes || classes.modifier}`,
      }}
      onClick={(e) => chooseFileHandler(e, props.inputRef)}
      aria-label={ariaLabel}
    >
      {children}
    </Controls>
  );
};

Choose.defaultProps = {
  btnText: "Choose File",
  hasFileBtnText: "Change File",
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
