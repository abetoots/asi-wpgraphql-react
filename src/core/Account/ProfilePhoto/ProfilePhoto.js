import React, { useState, useRef, useEffect } from "react";
import "./ProfilePhoto.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";

//Components
import Upload from "@Bits/Upload/Upload";
import UploadPreview from "@Bits/Upload/UploadPreview/UploadPreview";
import ChooseButton from "@Bits/Upload/UploadButton/choose";
import RemoveButton from "@Bits/Upload/UploadButton/remove";
import SaveButton from "@Bits/Upload/UploadButton/save";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Misc
import avatar from "@Assets/user.svg";
import {
  PROFILE_PHOTO,
  ACTION_AJAX_UPLOAD_FILE,
  ATTACHMENT_ID
} from "@Shared/constants";
import { isFile } from "@Shared/helper-funcs";
import * as actions from "@Store/actions/index";

const ProfilePhoto = props => {
  const [uploadState, setUploadState] = useState({
    file: "",
    preview: "",
    url: ""
  });

  const [uploadError, setUploadError] = useState({
    errorDev: null,
    output: ""
  });

  const uploadInputRef = useRef(null);

  useEffect(() => {
    if (props.fetchedAccount) {
      console.log(props.userAccount);
      setUploadState({ ...uploadState, ...props.userAccount[PROFILE_PHOTO] });
    }

    if (props.uploadedNew) {
      setUploadState({ ...uploadState, ...props.userAccount[PROFILE_PHOTO] });
    }
  }, [props.fetchedAccount, props.uploadedNew]);

  const uploadHandler = async e => {
    e.preventDefault();

    if (!isFile(uploadState.file)) {
      return;
    }

    props.startUpload();
    try {
      const data = new FormData();
      data.append(PROFILE_PHOTO, uploadState.file);
      const params = new URLSearchParams();
      params.append("action", ACTION_AJAX_UPLOAD_FILE);
      params.append(ATTACHMENT_ID, uploadState[ATTACHMENT_ID] || "");

      const resData = await fetch(
        BASE_URL + `wp-admin/admin-ajax.php?` + params,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`
          },
          body: data
        }
      ).then(res => {
        console.log("Fetch response", res);
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      });

      console.log(resData);
      props.uploadSuccess(resData);
    } catch (err) {
      console.log(err);

      setUploadError({
        errorDev: err,
        output: "Upload failed!"
      });
    }
  };

  const removeBtnHandler = e => {
    //TODO link as to why
    //We always want to revoke previous object url
    //Avoid memory issues by revoking the previous objecUrl created
    URL.revokeObjectURL(uploadState.preview);

    setUploadState({
      ...uploadState,
      file: "",
      preview: ""
    });
  };

  let saveBtn;
  let saveIcon = <FontAwesomeIcon icon="cloud-upload-alt" />;
  if (isFile(uploadState.file)) {
    if (props.uploading) {
      saveIcon = <FontAwesomeIcon icon="spinner" spin />;
    }
    saveBtn = (
      <SaveButton handleSave={uploadHandler}>
        {saveIcon}
        <span style={{ padding: "0 5px" }}>Save</span>
      </SaveButton>
    );
  }

  let errorNotice;
  if (uploadError.output !== "") {
    errorNotice = (
      <div className="ProfilePhoto__errorNotice -animate">
        {uploadError.output}
      </div>
    );
  }

  let errorTimer;
  useEffect(() => {
    if (errorTimer) {
      clearTimeout(errorTimer);
    }
    if (uploadError.output !== "") {
      props.uploadFailed(uploadError);
      errorTimer = setTimeout(() => {
        setUploadError({
          errorDev: null,
          output: ""
        });
      }, 4000);
    }
  }, [uploadError]);

  return (
    <div className="ProfilePhoto">
      {errorNotice}
      <Upload
        className="ProfilePhoto__upload"
        wrapperClassName="ProfilePhoto__uploadWrapper"
        state={uploadState}
        stateHandler={setUploadState}
        inputRef={uploadInputRef}
        label="Upload profile photo"
        elementConfig={{
          type: "file",
          accept: "image/png, image/jpeg"
        }}
      >
        <UploadPreview
          state={uploadState}
          className="ProfilePhoto__preview"
          imgClassName="ProfilePhoto__previewImg"
          placeholder={avatar}
        />
        <ChooseButton
          className="ProfilePhoto__btn -choose"
          inputRef={uploadInputRef}
        >
          <FontAwesomeIcon icon="camera" />
        </ChooseButton>
        <RemoveButton
          className="ProfilePhoto__btn -remove"
          handleRemove={removeBtnHandler}
        >
          <FontAwesomeIcon icon="trash" />
        </RemoveButton>
      </Upload>
      {saveBtn}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    fetchedAccount: state.account.fetched,
    token: state.auth.token,
    uploading: state.account.updating,
    uploadedNew: state.account.uploaded,
    uploadSuccess: state.account.updated,
    userAccount: state.account.data.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startUpload: () => dispatch(actions.uploadProfilePhotoStart()),
    uploadSuccess: data => dispatch(actions.uploadProfilePhotoSuccess(data)),
    uploadFailed: err => dispatch(actions.uploadProfilePhotoFailed(err))
  };
};

ProfilePhoto.propTypes = {
  fetchedAccount: PropTypes.bool,
  startUpload: PropTypes.func,
  token: PropTypes.string,
  uploading: PropTypes.bool,
  uploadedNew: PropTypes.bool,
  uploadSuccess: PropTypes.func,
  uploadFailed: PropTypes.func,
  userAccount: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhoto);
