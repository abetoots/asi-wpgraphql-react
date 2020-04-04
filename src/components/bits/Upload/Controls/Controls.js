import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/styles";

//Component
import Button from "@Bits/Button/Button";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * makeStyles returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will MERGE with only what you exposed
 */
const useStyles = makeStyles({
  modifier: {
    border: 0,
    borderRadius: "5px",
    boxShadow: `0 2px 5px 0 rgba(0, 0, 0, .16),
        0 2px 10px 0 rgba(0, 0, 0, .12)`,
    fontWeight: 500,
    minWidth: "fit-content",
    textTransform: "uppercase",
    transition: "all .15s ease-in-out",
    "&:hover": {
      boxShadow: `0 5px 11px 0 rgba(0, 0, 0, .18), 
        0 4px 15px 0 rgba(0, 0, 0, .15)`,
    },
  },
});

const Controls = (props) => {
  //Allow override by passing the parent's props. Overriding must be done through modifiers
  const classes = useStyles(props);

  return (
    <Button classes={{ root: classes.modifier }} {...props}>
      {props.children}
    </Button>
  );
};

Controls.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
  modifiers: PropTypes.object,
  rootModifiers: PropTypes.object,
};

export default Controls;
