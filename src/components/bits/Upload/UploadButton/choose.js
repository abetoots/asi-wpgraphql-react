import React from "react";
import "./UploadButton.scss";
import PropTypes from "prop-types";
import { isFile } from "../../../../misc/shared/helper-funcs";
import Button from "../../Button/Button";

const Choose = props => {
  //Button text
  //Default: If user currently has a file selected, button text changes from "Choose Upload" to "Change Upload"
  let btnText = "Choose File";
  let hasFileBtnText = "Change File";
  //Override
  if (props.btnText) {
    btnText = props.btnText;
  }
  if (props.hasFileBtnText) {
    hasFileBtnText = props.hasFileBtnText;
  }

  //Children
  //Default: Single child <span/> with text changing depending on btnText and hasFileBtnTxt.
  let children = (
    <span>{isFile(props.state.file) ? hasFileBtnText : btnText}</span>
  );
  //Override
  /**
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText and hasFileBtnTxt. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = isFile(props.state.file) ? hasFileBtnText : btnText;
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
    <Button
      className={props.className || "UploadButton -choose"}
      onClick={e => chooseFileHandler(e, props.inputRef)}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

Choose.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  inputRef: PropTypes.object.isRequired,
  hasFileBtnText: PropTypes.string,
  state: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
      .isRequired,
    preview: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
};

export default Choose;
