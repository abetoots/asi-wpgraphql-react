import React, { useRef } from "react";
import "./Menu.scss";
import PropTypes from "prop-types";

//Components
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import SubMenu from "./SubMenu/SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//TODO maybe handle more elegantly
const Menu = props => {
  const wrapperRef = useRef(null);
  const subMenuRef = useRef(null);
  const classes = ["Menu"];

  if (!props.visible) {
    classes.push("-hidden");
  }

  if (props.desktopOnly) {
    classes.push("-desktopOnly");
  }

  let label;
  if (props.label) {
    label = <h4 className="Menu__label">{props.label}</h4>;
  }

  const expandSubMenuHandler = e => {
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
    <nav className={classes.join(" ")}>
      {label}
      <ul
        className={`Menu__ul ${props.horizontal ? " -horizontal" : ""}`}
        aria-expanded={props.visible}
      >
        {props.linklist.map(item => {
          let subMenu;
          let subMenuButton;
          if (item.nest && item.nest[0]) {
            subMenuButton = (
              <Button
                className="Menu__subMenuBtn"
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
            <li className="Menu__li" key={item.path}>
              <NavLink to={item.path} exact={item.exact} className="Menu__link">
                <div
                  className="Menu__touchTarget"
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
  visible: true
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
      label: PropTypes.string.isRequired
    }).isRequired
  ),
  touchTargetStyles: PropTypes.object,
  visible: PropTypes.bool
};

export default Menu;
