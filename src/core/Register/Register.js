import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

//Components
import Layout from "@Components/layout";
import Form from "@Bits/Form/Form";
import Input from "@Bits/Input/Input";

//Misc
import { store } from "../../index";
import inputs, { useFormState } from "@Forms/register";
import { useLazyRegisterUser } from "@Hooks/useLazyRegisterUser";
import { getRegisterUserMutation } from "@Shared/graphql-requests";
import * as actions from "@Store/actions/index";

const Register = props => {
  const [formState, setFormState] = useFormState();
  const [startRegister] = useLazyRegisterUser(store.dispatch);

  useEffect(() => {
    props.registrationWillStart();
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const { username, email, password } = formState;

    startRegister(getRegisterUserMutation(username, email, password));
  };
  return (
    <Layout
      mainStyle={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1rem"
      }}
    >
      <h2>
        Register an Account <span role="img">📋</span>:
      </h2>
      <Form
        handleSubmit={submitHandler}
        loading={props.registering}
        error={props.errorRegister.output}
        success={props.registeredNewUser}
        btnText="Register"
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
    registering: state.registration.pending,
    registeredNewUser: state.registration.registered,
    errorRegister: state.registration.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registrationWillStart: () => dispatch(actions.registerUserWillStart())
  };
};

Register.propTypes = {
  registering: PropTypes.bool,
  registeredNewUser: PropTypes.bool,
  errorRegister: PropTypes.object,
  registrationWillStart: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
