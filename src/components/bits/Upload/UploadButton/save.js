import React from "react";
import "./UploadButton.scss";
import PropTypes from "prop-types";
import Button from "../../Button/Button";

const Save = props => {
  //Button text
  //Default:
  let btnText = "Save";
  //Override
  if (props.btnText) {
    btnText = props.btnText;
  }

  //Children
  //Default: Single child <span/> with text depending on btnText.
  let children = <span>{btnText}</span>;
  //Override
  /**
   * Problem: We don't know if props.children will contain any text to make it accessible to screen readers.
   * Solution: We add an aria-label to the button depending on btnText. This ensures our button
   * is accessible in case props.children won't contain any text
   */
  let ariaLabel;
  if (props.children) {
    ariaLabel = btnText;
    children = props.children;
  }

  return (
    <Button
      className={props.className || "UploadButton -save"}
      onClick={props.handleSave}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

Save.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  handleSave: PropTypes.func.isRequired,
  hasFileBtnText: PropTypes.string
};

export default Save;
