import React from "react";
import styles from "./Preview.module.scss";
import PropTypes from "prop-types";

//Misc
import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  root: {
    padding: "15px",
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
  },
});

const Preview = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        src={props.state.preview || props.state.url || props.placeholder || ""}
      />
    </div>
  );
};

Preview.propTypes = {
  className: PropTypes.string,
  imgClassName: PropTypes.string,
  state: PropTypes.shape({
    url: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
};

export default Preview;
