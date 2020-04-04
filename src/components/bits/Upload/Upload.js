import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Upload.scss";

//Components
import UploadPreview from "./UploadPreview/UploadPreview";
import Choose from "./Controls/choose";
import Save from "./Controls/save";
import Remove from "./Controls/remove";

//Misc
import { makeStyles } from "@material-ui/styles";
import { visuallyHidden } from "@Styles/mixins";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const input = visuallyHidden();
const useStyles = makeStyles({
  root: {},
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  input: input,
});

/**
 * Component API
 * Overrides:
 *  - showPreview: set to false if we want to handle the preview box elsewhere. always true inside an <Input/>
 *  - handleUpload: pass in a function to get the Save button to trigger the upload.
 *
 */
// eslint-disable-next-line react/display-name
const Upload = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  let uploadInputRef;
  if (props.inputRef) {
    uploadInputRef = props.inputRef;
  } else {
    uploadInputRef = useRef(null);
  }

  const fileInputHandler = (event) => {
    //Return when user doesn't select anything
    if (event.target.files.length == 0) {
      return;
    }

    //TODO link to explanation
    //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //can use that URL to gain access to your file
    if (props.state.preview) {
      URL.revokeObjectURL(props.state.preview);
    }

    //Make a state copy then merge new values
    const file = event.target.files[0];
    props.stateHandler({
      ...props.state,
      file: file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeBtnHandler = (e) => {
    //TODO link as to why
    //We always want to revoke previous object url
    //Avoid memory issues by revoking the previous objecUrl created
    URL.revokeObjectURL(props.state.preview);

    props.stateHandler({
      ...props.state,
      file: "",
      preview: "",
    });
  };

  //Preview box
  //Default: Not shown.
  let preview;
  if (props.showPreview) {
    preview = <UploadPreview config={props.state} />;
  }

  //Controls
  //Default: If children are found, all controls are to be handled by the children components
  let controls;
  if (props.children) {
    //TODO type checking specific control buttons from /Buttons
    //Distribute some of parent's props to the children
    //https://reactjs.org/docs/react-api.html#reactchildren
    //https://reactjs.org/docs/react-api.html#cloneelement
    controls = React.Children.map(props.children, (child) =>
      React.cloneElement(child, {
        state: props.state,
      })
    );
  } else {
    controls = (
      <>
        <Choose state={props.state} inputRef={uploadInputRef} />
        <Save state={props.state} handleSave={props.handleUpload} />
        <Remove state={props.state} handleRemove={removeBtnHandler} />
      </>
    );
  }

  //End controls

  return (
    <div className={props.className || "Upload"}>
      <div className={props.wrapperClassName || "Upload__wrapper"}>
        {preview}
        {controls}
      </div>
      <input
        className="Upload__input"
        {...props.elementConfig}
        onChange={fileInputHandler}
        ref={uploadInputRef}
        aria-labelledby={props.label.toLowerCase().replace(/\s/g, "-")}
      />
    </div>
  );
};

Upload.defaultProps = {
  showPreview: false,
};

Upload.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
  }).isRequired,
  handleUpload: PropTypes.func,
  inputRef: PropTypes.object,
  label: PropTypes.string.isRequired,
  showPreview: PropTypes.bool,
  state: PropTypes.shape({
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)])
      .isRequired,
    preview: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  stateHandler: PropTypes.func.isRequired,
};

export default Upload;
