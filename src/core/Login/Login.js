import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//Components
import Form from "@Bits/Form/Form";
import Input from "@Bits/Input/Input";
import Layout from "@Components/layout";
import BoundaryRedirect from "@Hoc/BoundaryRedirect/BoundaryRedirect";

//Misc
import { store } from "../../index";
import inputs, { useFormState } from "@Forms/login";
import { useLazyLoginMutation } from "@Hooks/authentication";
import { getLoginMutation } from "@Shared/graphql-requests";

const Login = props => {
  const [formState, setFormState] = useFormState();
  const [startLogin] = useLazyLoginMutation(store.dispatch);
  const [error, setError] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    const { login, password } = formState;

    if (!login && !password) {
      return setError("Login & Password not set");
    }
    startLogin(getLoginMutation(login, password));
  };

  return (
    <Layout
      mainStyle={{
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <BoundaryRedirect
        if={props.calledAuth && props.authenticated}
        ifTrueTo="/"
      />
      <Form
        handleSubmit={submitHandler}
        loading={props.pendingAuth}
        error={error || props.errorAuth.output}
      >
        {inputs.map(input => {
          return (
            <Input
              state={formState}
              stateHandler={(inputKey, inputValue) =>
                setFormState(inputKey, inputValue, input.hasToRemove)
              }
              key={input.key}
              inputKey={input.key}
              label={input.label}
              elType={input.elType}
              initialValue={input.initialValue}
              elementConfig={input.elementConfig}
              description={input.description || ""}
              customProps={input.customProps || {}}
              iconConfig={input.iconConfig || {}}
            />
          );
        })}
      </Form>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    calledAuth: state.auth.called,
    authenticated: state.auth.authenticated,
    pendingAuth: state.auth.pending,
    errorAuth: state.auth.error
  };
};

Login.propTypes = {
  calledAuth: PropTypes.bool,
  authenticated: PropTypes.bool,
  pendingAuth: PropTypes.bool,
  errorAuth: PropTypes.object
};

export default connect(mapStateToProps)(Login);
