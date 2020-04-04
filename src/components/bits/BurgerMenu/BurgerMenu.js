import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerMenu.module.scss";

import { exposeStylesWillReplace } from "@Styles/api";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStylesWillReplace returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will REPLACE only what you exposed
 */
const useStyles = exposeStylesWillReplace({
  toggled: styles._toggled,
});

const BurgerMenu = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);

  const burgerClasses = [styles.BurgerMenu];

  if (props.toggled) {
    burgerClasses.push(classes.toggled);
  }

  let hidden;
  if (props.hideLabel) {
    hidden = styles._hidden;
  }
  return (
    <button
      className={burgerClasses.join(" ")}
      aria-expanded={props.toggled}
      onClick={props.handleClick}
    >
      <div className={`${styles.BurgerMenu__bar} ${styles._one}`}></div>
      <div className={`${styles.BurgerMenu__bar} ${styles._two}`}></div>
      <div className={`${styles.BurgerMenu__bar} ${styles._three}`}></div>
      <span className={`${styles.BurgerMenu__label} ${hidden}`}>Menu</span>
    </button>
  );
};

BurgerMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  hideLabel: PropTypes.bool,
  toggled: PropTypes.bool,
};

export default BurgerMenu;
