import React from "react";
import PropTypes from "prop-types";

import Header from "@Components/Header/Header";
import Footer from "@Components/Footer/Footer";
import Spinner2 from "@Bits/Spinner/Spinner2";

const Layout = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  let loading;
  if (props.loading) {
    loading = props.loadingComponent ? (
      props.loadingComponent
    ) : (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >
        <Spinner2 />
      </div>
    );
  }

  let error;
  if (props.error) {
    error = <div>{`${props.error}`}</div>;
  }

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "calc(100vh - 128px)",
          ...props.mainStyle
        }}
      >
        {error || loading || children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  loadingComponent: PropTypes.elementType,
  mainStyle: PropTypes.object
};

export default Layout;
