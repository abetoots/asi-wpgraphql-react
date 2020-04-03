import React, { useRef, forwardRef } from "react";
import "./SubMenu.scss";
import PropTypes from "prop-types";

//Components
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/display-name
const SubMenu = forwardRef((props, subMenuRef) => {
  return (
    <div ref={subMenuRef} className="SubMenu">
      <div ref={props.wrapperRef}>
        <ul>
          {props.linklist.map(item => (
            <li className="SubMenu__li" key={item.path}>
              <NavLink
                to={item.path}
                exact={item.exact}
                className="SubMenu__link"
              >
                <div
                  className="SubMenu__touchTarget"
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
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  touchTargetStyles: PropTypes.object,
  wrapperRef: PropTypes.object
};

export default SubMenu;
