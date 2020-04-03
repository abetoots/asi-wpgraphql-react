import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Account.scss";

import { connect } from "react-redux";

//Components
import Form from "@Bits/Form/Form";
import Input from "@Bits/Input/Input";
import Layout from "@Components/layout";
import BoundaryRedirect from "@Hoc/BoundaryRedirect/BoundaryRedirect";
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";

//Misc
import { store } from "../../index";
import inputs, { useFormState } from "@Forms/account";
import { useLazyUpdateAccount } from "@Hooks/useLazyUpdateAccount";
import { useLazyFetchAccount } from "@Hooks/useLazyFetchAccount";
import {
  getUpdateAccountMutation,
  getFetchAccountMutation
} from "@Shared/graphql-requests";
import { USER_ID } from "@Shared/constants";

//TODO Better user account UI (search dribble) and maybe similar to GoFundMe
//TODO this should be Edit Account
const Account = props => {
  const [formState, setFormState] = useFormState();
  const [startUpdate] = useLazyUpdateAccount(store.dispatch, props.token);
  const [startFetchAccount] = useLazyFetchAccount(store.dispatch, props.token);

  useEffect(() => {
    if (props.authenticated && !props.fetchedAcc) {
      startFetchAccount(getFetchAccountMutation(localStorage.getItem(USER_ID)));
    }

    if (props.fetchedAcc) {
      for (let [key, value] of Object.entries(props.userAccount)) {
        setFormState(key, value);
      }
    }
  }, [props.userAccount]);

  const submitHandler = e => {
    e.preventDefault();
    startUpdate(getUpdateAccountMutation(formState));
  };

  return (
    <Layout
      loading={props.fetchingAcc && !props.called}
      error={props.fetchError.output}
      mainStyle={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem"
      }}
    >
      <BoundaryRedirect if={!props.authenticated} ifTrueTo="/">
        <ProfilePhoto />
        <Form
          handleSubmit={submitHandler}
          loading={props.updatingAcc}
          error={props.fetchError.output}
          success={props.updatedAcc}
        >
          {inputs.map(input => {
            return (
              <Input
                state={formState}
                stateHandler={(inputKey, inputValue) =>
                  setFormState(inputKey, inputValue, input.hasToRemoveButton)
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
      </BoundaryRedirect>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authenticated: state.auth.authenticated,
    called: state.account.calledFetch,
    fetchingAcc: state.account.fetching,
    fetchedAcc: state.account.fetched,
    fetchError: state.account.fetchError,
    updatedAcc: state.account.updated,
    updatingAcc: state.account.updating,
    userAccount: state.account.data.user
  };
};

Account.propTypes = {
  authenticated: PropTypes.bool,
  account: PropTypes.object,
  called: PropTypes.bool,
  fetchedAcc: PropTypes.bool,
  fetchingAcc: PropTypes.bool,
  fetchError: PropTypes.object,
  fetchAccount: PropTypes.func,
  token: PropTypes.string,
  updateAccountFailed: PropTypes.func,
  updateAccount: PropTypes.func,
  updatingAcc: PropTypes.bool,
  updatedAcc: PropTypes.bool,
  userAccount: PropTypes.object
};

export default connect(mapStateToProps)(Account);
