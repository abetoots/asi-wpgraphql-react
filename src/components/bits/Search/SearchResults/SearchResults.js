import React from "react";
import styles from "./SearchResults.module.scss";
import PropTypes from "prop-types";

//Misc
import { exposeStylesWillReplace } from "@Styles/api";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStylesWillReplace returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will REPLACE only what you exposed
 */
const useStyles = exposeStylesWillReplace({
  root: styles.SearchResults,
  ul: styles.SearchResults__ul,
  li: styles.SearchResults__li,
});

const SearchResults = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <ul className={classes.ul}>
        {props.data.map((item) => (
          <li
            className={classes.li}
            key={item.result}
            onClick={(e) => props.handleClick(e, item)}
          >
            {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
};

export default SearchResults;
