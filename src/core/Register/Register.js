import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";

//Misc
import inputs, { useFormState } from "../../misc/forms/register";
import { useLazyRegisterUser } from "../../misc/hooks/useLazyRegisterUser";
import { store } from "../../index";
import { getRegisterUserMutation } from "../../misc/shared/graphql-requests";
import * as actions from "../../misc/store/actions/index";

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
