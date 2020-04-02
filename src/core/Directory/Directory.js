import React, { useEffect } from "react";
import "./Directory.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";

//Components
import Layout from "../../components/layout";
import Filters from "./Filters/Filters";
import Results from "./Results/Results";

//Misc
import { store } from "../../index";
import { useLazyFetchVendors } from "../../misc/hooks/useLazyFetchVendors";

const Directory = props => {
  const [startFetchVendors] = useLazyFetchVendors(store.dispatch);
  useEffect(() => {
    if (!props.fetchingVendors && !props.fetchedVendors) {
      //TODO check query strings first before fetching
      console.log(props.location);
      console.log(props.history);
      //   startFetchVendors(getFetchVendorsMutation(queries));
    }
  }, []);

  const filterHandler = (e, activeFilters) => {
    // props.retrieveFilteredVendors(activeFilters); //replace with lazy hooks
  };

  const refreshHandler = e => {
    // startFetchVendors(getFetchVendorsMutation(queries));
  };

  return (
    <Layout
      loading={props.fetchingVendors}
      error={props.errorVendors.output}
      mainStyle={{ padding: "1rem" }}
    >
      <div className="Directory">
        <Filters handleFilter={filterHandler} />
        <Results
          handleRefresh={refreshHandler}
          fetching={true}
          data={props.vendors}
        />
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    vendors: state.vendors.vendors,
    fetchedVendors: state.vendors.fetched,
    fetchingVendors: state.vendors.fetching,
    errorVendors: state.vendors.error
  };
};

Directory.propTypes = {
  errorVendors: PropTypes.object,
  fetchingVendors: PropTypes.bool,
  fetchedVendors: PropTypes.bool,
  vendors: PropTypes.array,
  fetchVendors: PropTypes.func,
  retrieveFilteredVendors: PropTypes.func
};

export default connect(mapStateToProps)(Directory);
