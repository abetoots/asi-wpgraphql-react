import React from "react";
import PropTypes from "prop-types";
import styles from "./Logo.module.scss";

import { exposeStylesWillReplace } from "@Styles/api";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStylesWillReplace returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will REPLACE only what you exposed
 */
const useStyles = exposeStylesWillReplace({
  image: styles.Logo__img,
});

const Logo = (props) => {
  const classes = useStyles(props);
  return (
    <div className={styles.Logo}>
      <img
        className={classes.image}
        src={props.src}
        alt={props.alt ? `${props.alt}` : "Site Logo"}
      />
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Logo;
