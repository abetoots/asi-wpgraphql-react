import React from "react";
import "./ResultPreview.scss";
import PropTypes from "prop-types";

import truncate from "lodash.truncate";
import parse from "html-react-parser";

const truncateHtml = (htmlString, maxLength) => {
  let truncated = truncate(htmlString, {
    length: maxLength,
    //lazy match(shortest substring) a closing html tag , spaces after comma ,or spaces after period to be used as a separator
    separator: /,? +|.? +|<\/.*?>/
  });
  const parseOptions = {
    replace: domNode => {
      // console.log(domNode)
    }
  };

  return parse(truncated, parseOptions);
};

const ResultPreview = props => {
  return (
    <div className="ResultPreview">
      <div className="ResultPreview__slot -head">
        <h4 className="ResultPreview__name">{props.data.businessName}</h4>
        <img className="ResultPreview__photo" src={props.data.profilePhoto} />
      </div>
      <div className="ResultPreview__slot">
        {truncateHtml(props.data.description, 140)}
      </div>
    </div>
  );
};

ResultPreview.propTypes = {
  data: PropTypes.object
};

export default ResultPreview;
