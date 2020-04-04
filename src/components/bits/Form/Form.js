import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.scss";

//Components
import Button from "@Bits/Button/Button";
import Status from "./UI/status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Misc
import { exposeStylesWillReplace } from "@Styles/api";

//Define which styles of the component you want to expose. Only what you expose can be overridden.
/**
 * exposeStylesWillReplace returns a function.
 * consume: when consumed with props, checks props.classes internally.
 * behavior: props.classes will REPLACE only what you exposed
 */
const useStyles = exposeStylesWillReplace({
  root: styles.Form,
  submit: styles.Form__submitBtn,
});

const Form = (props) => {
  //Consume with props to return classes that are either merged or replaced depending on what you defined above
  const classes = useStyles(props);
  //Default styles
  const { Form__status, _success, _error } = styles;

  let statusUi;
  if (props.children) {
    let found = false;
    React.Children.forEach(props.children, (child) => {
      if (child.type.name === "Status") {
        return (found = true);
      }
    });

    //We found <Status/> components
    if (found) {
      //But if showStatus is disabled, we show an error
      if (!props.showStatusUi) {
        console.error(
          "Form: You currently have disabled status hints but have <Status/> components. Please enable 'showStatusUi' first"
        );
      } else {
        //We provide the children with this Form's props.success and props.error
        React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            error: props.error,
            success: props.success,
          })
        );
      }
    } else {
      statusUi = (
        <>
          <Status
            onSuccess
            success={props.success}
            classes={{ root: `${Form__status} ${_success}` }}
          >
            Success
            <span role="img" alt="success">
              ✅
            </span>
          </Status>
          <Status
            onError
            error={props.error}
            classes={{ root: `${Form__status} ${_error}` }}
          >
            {props.error}
            <span role="img" alt="error">
              ❌
            </span>
          </Status>
        </>
      );
    }
  }

  return (
    <form
      className={classes.root}
      onSubmit={props.handleSubmit}
      style={{ ...props.formStyles }}
    >
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
      <Button
        classes={{ root: classes.submit }}
        disabled={props.loading}
        type="submit"
      >
        {props.loading ? (
          <FontAwesomeIcon icon="spinner" spin />
        ) : (
          props.btnText || "Submit"
        )}
      </Button>
      {statusUi}
    </form>
  );
};

Form.defaultProps = {
  showStatusUi: true,
  success: false,
  error: "",
};

Form.propTypes = {
  btnText: PropTypes.string,
  children: PropTypes.node,
  showStatusUi: PropTypes.bool,
  error: PropTypes.string,
  formStyles: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
};

export default Form;
