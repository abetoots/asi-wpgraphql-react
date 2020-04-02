import React from "react";
import "./Results.scss";
import PropTypes from "prop-types";

//Components
import ResultPreview from "./ResultPreview/ResultPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner2 from "../../../components/UI/Spinner/Spinner2";

const Results = props => {
  let resultsWindow;
  if (props.fetching) {
    resultsWindow = (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >
        <Spinner2 />
      </div>
    );
  } else {
    resultsWindow = props.data.map(item => (
      <ResultPreview key={item.id} data={item.data} />
    ));
  }

  return (
    <div className={`Results ${props.fetching ? "-loading" : ""}`}>
      <div className="Results__slot -refresh">
        <button className="Results__refreshBtn" onClick={props.handleRefresh}>
          <FontAwesomeIcon icon={["fas", "sync-alt"]} spin={props.fetching} />
          <span style={{ padding: "0 15px" }}>Refresh Results</span>
        </button>
      </div>
      <div className="Results__slot -window">{resultsWindow}</div>
    </div>
  );
};

Results.propTypes = {
  handleRefresh: PropTypes.func,
  fetching: PropTypes.bool,
  data: PropTypes.array
};

export default Results;
