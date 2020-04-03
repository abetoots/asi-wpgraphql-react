import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./file.scss";

import UploadPreview from "../Upload/UploadPreview/UploadPreview";
import Choose from "../Upload/UploadButton/choose";
import Remove from "../Upload/UploadButton/remove";

/**
 * Defaults:
 *  - you always get the preview box and the choose & remove buttons
 *
 * Overrides from props.customProps:
 *  - btnText: defaults to "Choose File"
 *  - hasFileBtnText: when user currently has a file selection, this text takes over btnText. defaults to "Change File"
 *  - showPreview: set to false if you want to handle preview elsewhere.
 *
 */
const File = props => {
  const fileInputEl = useRef(null);

  /**
   * Upload button handler
   * Problem: We can't style <input type="file"/> buttons through css
   * Solution: We delegate it to a different button we can style which simply triggers a click on <input type="file"/>
   */
  const chooseFileHandler = event => {
    fileInputEl.current.click();
  };

  const fileInputHandler = event => {
    //Return when user doesn't select anything
    if (event.target.files.length == 0) {
      return;
    }

    //TODO link to explanation
    //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //can use that URL to gain access to your file
    if (props.state[props.inputKey].preview) {
      URL.revokeObjectURL(props.state[props.inputKey].preview);
    }

    //Make a state copy then merge new values
    const file = event.target.files[0];
    props.stateHandler(props.inputKey, {
      ...props.state[props.inputKey],
      file: file,
      preview: URL.createObjectURL(file)
    });
  };

  const removeBtnHandler = e => {
    //REMOVE should remove the preview and the file from the state
    //TODO link as to why
    //We always want to revoke previous object url
    //Avoid memory issues by revoking the previous objecUrl created
    URL.revokeObjectURL(props.state[props.inputKey].preview);

    props.stateHandler(props.inputKey, {
      ...props.state[props.inputKey],
      file: "",
      preview: ""
    });
  };

  //Preview box
  //Default: Not shown.
  let preview;
  if (props.customProps.showPreview) {
    preview = <UploadPreview config={props.state[props.inputKey]} />;
  }

  //Controls
  //Default: If children are found, all controls are to be handled by the children components
  let controls;
  if (props.customProps.controls) {
    //TODO type checking specific control buttons from /Buttons
    //Distribute some of parent's props to the children
    //https://reactjs.org/docs/react-api.html#reactchildren
    //https://reactjs.org/docs/react-api.html#cloneelement
    controls = React.Children.map(props.customProps.controls, child =>
      React.cloneElement(child, { state: props.state[props.inputKey] })
    );
  } else {
    controls = (
      <>
        <Choose handleChoose={chooseFileHandler} />
        <Remove handleRemove={removeBtnHandler} />
      </>
    );
  }

  //End controls

  return (
    <div className="File">
      <div className="File__slot -flex">
        {preview}
        {controls}
      </div>
      <input
        className="File__input"
        {...props.elementConfig}
        onChange={fileInputHandler}
        ref={fileInputEl}
        aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
      />
    </div>
  );
};

File.propTypes = {
  customProps: PropTypes.shape({
    btnText: PropTypes.string,
    hasFileBtnText: PropTypes.string,
    showPreview: PropTypes.bool,
    controls: PropTypes.element
  }),
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired
  }).isRequired,
  inputKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  stateHandler: PropTypes.func.isRequired
};

export default File;
