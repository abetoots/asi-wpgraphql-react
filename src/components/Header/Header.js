import React, { useState, useRef } from "react";
import "./Header.scss";

import { NavLink } from "react-router-dom";

import Logo from "../UI/Logo/Logo";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";
import Menu from "../UI/Menu/Menu";

import logo from "../../assets/images/asi-logo.svg";
import { authLinkList, unAuthLinkList } from "../../misc/shared/link-list";
import { tokenCache } from "../../misc/hooks/authentication";

const Header = props => {
  const [menuToggled, setMenuToggled] = useState(false);

  const targetElToDisplay = useRef(null);

  const menuClickHandler = e => {
    setMenuToggled(prev => !prev);
  };
  return (
    <section className="HeaderWrap">
      <header className="Header">
        <NavLink to="/">
          <Logo src={logo} alt="React WP GraphQl Logo" />
        </NavLink>
        <BurgerMenu handleClick={menuClickHandler} toggled={menuToggled} />
      </header>
      <div ref={targetElToDisplay} className="HeaderWrap__slot -menu">
        <Menu
          linklist={tokenCache.token ? authLinkList : unAuthLinkList}
          visible={menuToggled}
          touchTargetStyles={{
            borderBottom: "1px solid #ccc"
          }}
        />
      </div>
    </section>
  );
};

export default Header;
