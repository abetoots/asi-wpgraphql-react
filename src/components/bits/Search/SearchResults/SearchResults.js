import React from "react";
import PropTypes from "prop-types";

const SearchResults = props => (
  <div className="SearchResults">
    <ul className="SearchResults__ul">
      {props.data.map(item => (
        <li
          className="SearchResults__li"
          key={item.result}
          onClick={e => props.handleClick(e, item)}
        >
          {item.result}
        </li>
      ))}
    </ul>
  </div>
);

SearchResults.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func
};

export default SearchResults;
