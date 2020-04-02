import React from "react";
import "./UploadPreview.scss";
import PropTypes from "prop-types";

const UploadPreview = props => {
  return (
    <div className={props.className || "UploadPreview"}>
      <img
        className={props.imgClassName || "UploadPreview__img"}
        src={props.state.preview || props.state.url || props.placeholder || ""}
      />
    </div>
  );
};

UploadPreview.propTypes = {
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }),
  placeholder: PropTypes.string
};

export default UploadPreview;
