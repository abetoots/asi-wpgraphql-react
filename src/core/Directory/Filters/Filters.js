import React, { useState, useRef } from "react";
import "./Filters.scss";
import PropTypes from "prop-types";

//Components
import BackDrop from "@Bits/Backdrop/Backdrop";
import Button from "@Bits/Button/Button";
import Controls from "./FilterControls/FilterControls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filters = props => {
  const [showBackDrop, setShowBackDrop] = useState(false);

  const targetMobileEl = useRef(null);

  const backDropClickHandler = e => {
    targetMobileEl.current.classList.toggle("-toggled");
    setShowBackDrop(false);
  };

  const mobileClickHandler = e => {
    targetMobileEl.current.classList.toggle("-toggled");
    setShowBackDrop(true);
  };

  return (
    <div className="Filters">
      <div className="Filters__slot -mobile">
        <BackDrop show={showBackDrop} handleClick={backDropClickHandler} />
        <Button onClick={mobileClickHandler} className="Filters__mobileBtn">
          <FontAwesomeIcon icon={["fas", "sliders-h"]} />
          <span className="FilterControls__mobileBtnText">Filter</span>
        </Button>
        <div ref={targetMobileEl} className="Filters__mobileTarget">
          <Controls handleSubmit={props.handleFilter} />
        </div>
      </div>
      <div className="Filters__slot -desktop">
        <Controls handleSubmit={props.handleFilter} />
      </div>
    </div>
  );
};

Filters.propTypes = {
  handleFilter: PropTypes.func
};

export default Filters;
