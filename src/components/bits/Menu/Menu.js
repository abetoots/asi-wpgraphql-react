import React, { useRef } from "react";
import styles from "./Menu.module.scss";
import PropTypes from "prop-types";

//Components
import { NavLink } from "react-router-dom";
import Button from "@Bits/Button/Button";
import SubMenu from "./SubMenu/SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Misc
import { makeStyles } from "@material-ui/styles";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  subMenuButton: styles.Menu__subMenuBtn,
});

//TODO maybe handle sub menus more elegantly
const Menu = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Default styles
  const {
    Menu,
    Menu__label,
    Menu__ul,
    Menu__li,
    Menu__touchTarget,
    Menu__link,
    _horizontal,
    _hidden,
    _desktopOnly,
  } = styles;

  const wrapperRef = useRef(null);
  const subMenuRef = useRef(null);
  const menuClasses = [Menu];

  if (!props.visible) {
    menuClasses.push(_hidden);
  }

  if (props.desktopOnly) {
    menuClasses.push(_desktopOnly);
  }

  let label;
  if (props.label) {
    label = <h4 className={Menu__label}>{props.label}</h4>;
  }

  const expandSubMenuHandler = (e) => {
    e.preventDefault();
    if (subMenuRef.current === null) {
      console.log("target not found");
      return;
    }

    const wrapperHeight = wrapperRef.current.getBoundingClientRect().height;
    const targetHeight = subMenuRef.current.clientHeight;
    if (targetHeight > 0) {
      subMenuRef.current.style.height = 0;
    } else {
      subMenuRef.current.style.height = `${wrapperHeight}px`;
    }
  };

  return (
    <nav className={menuClasses.join(" ")}>
      {label}
      <ul
        className={`${Menu__ul} ${props.horizontal ? _horizontal : ""}`}
        aria-expanded={props.visible}
      >
        {props.linklist.map((item) => {
          let subMenu;
          let subMenuButton;
          if (item.nest && item.nest[0]) {
            subMenuButton = (
              <Button
                classes={{
                  root: classes.subMenuButton,
                }}
                onClick={expandSubMenuHandler}
              >
                <FontAwesomeIcon icon="chevron-circle-down" />
                <span>{`Expand ${item.label} sub menu`}</span>
              </Button>
            );
            subMenu = (
              <SubMenu
                ref={subMenuRef}
                wrapperRef={wrapperRef}
                linklist={item.nest}
              />
            );
          }
          return (
            <li className={Menu__li} key={item.path}>
              <NavLink to={item.path} exact={item.exact} className={Menu__link}>
                <div
                  className={Menu__touchTarget}
                  style={{ ...props.touchTargetStyles }}
                >
                  <span>{item.label}</span>
                  {subMenuButton}
                </div>
              </NavLink>
              {subMenu}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Menu.defaultProps = {
  visible: true,
};

Menu.propTypes = {
  desktopOnly: PropTypes.bool,
  horizontal: PropTypes.bool,
  label: PropTypes.string,
  linklist: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      component: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  touchTargetStyles: PropTypes.object,
  visible: PropTypes.bool,
};

export default Menu;
