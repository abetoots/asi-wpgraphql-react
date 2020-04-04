import React, { forwardRef } from "react";
import styles from "./SubMenu.module.scss";
import PropTypes from "prop-types";

//Components
import { NavLink } from "react-router-dom";

//Misc
import { exposeStylesWillReplace } from "@Styles/api";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStylesWillReplace returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will REPLACE only what you exposed
 */
const useStyles = exposeStylesWillReplace({
  root: styles.SubMenu,
  ul: styles.SubMenu__ul,
  li: styles.SubMenu__li,
  link: styles.SubMenu__link,
});

// eslint-disable-next-line react/display-name
const SubMenu = forwardRef((props, subMenuRef) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Default styles
  const { SubMenu__touchTarget } = styles;

  return (
    <div ref={subMenuRef} className={classes.root}>
      <div ref={props.wrapperRef}>
        <ul className={classes.ul}>
          {props.linklist.map((item) => (
            <li className={classes.li} key={item.path}>
              <NavLink
                to={item.path}
                exact={item.exact}
                className={classes.link}
              >
                <div
                  className={SubMenu__touchTarget}
                  style={{ ...props.touchTargetStyles }}
                >
                  <span>{item.label}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

SubMenu.propTypes = {
  linklist: PropTypes.arrayOf(
    PropTypes.exact({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      component: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  touchTargetStyles: PropTypes.object,
  wrapperRef: PropTypes.object,
};

export default SubMenu;
