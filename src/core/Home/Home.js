import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Home.scss";

//Redux
import { connect } from "react-redux";

//Components
import Layout from "../../components/layout";
// import Hero from "../../components/Hero/Hero";
import SvgButtons from "../../components/SvgButtons/SvgButtons";
import Search from "../../components/UI/Search/Search";
import SearchResults from "../../components/UI/Search/SearchResults/SearchResults";
import { NavLink } from "react-router-dom";

//Assets
// import heroMobile from "../../assets/images/hero-mobile.jpg";
// import heroTablet from "../../assets/images/hero-tablet.jpg";
// import hero from "../../assets/images/hero-original.jpg";
import { searchIcon3 } from "../../assets/search-icons";

//Misc
import { categories } from "../../misc/shared/categories";
import { categoryIcons } from "../../misc/shared/categories";
import useDebounce from "../../misc/hooks/useDebounce";
import * as actions from "../../misc/store/actions/index";

const Home = props => {
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Listen for changes in inputVal
  const debouncedInputVal = useDebounce(inputVal, 400);

  //The auto search API call.
  //After render, listen only for changes in the DEBOUNCED inputVal, not the inputVal
  useEffect(() => {
    //only when the value to search exceeds 3 chars
    if (debouncedInputVal && debouncedInputVal.length >= 3) {
      //Search handles three cases:

      //1. Do a search locally to find if user is searching for a category
      const regex = new RegExp(debouncedInputVal, "i"); //do a case insensitive match
      const foundCategories = [];
      categories.forEach(cat => {
        if (regex.test(cat))
          foundCategories.push({
            category: true,
            result: cat
          });
      });
      if (foundCategories.length > 0) {
        setSearchResults([...searchResults, ...foundCategories]);
      }

      //2. Do a remote search for vendor names or addresses
    } else {
      setSearchResults([]);
    }
  }, [debouncedInputVal]);

  const submitHandler = e => {
    e.preventDefault();
  };

  const inputChangedHandler = e => {
    setInputVal(e.target.value.toLowerCase());
  };

  const resultClickHandler = (e, result) => {
    if (result.category) {
      //if result is category, go  to directory with results filtered in that category
      console.log(result, "[category]");
    }
    if (result.businessName) {
      //if businessname, get doc, then go to that vendor's page
      console.log(result, "[businessName]");
    }
  };

  const iconButtonClickHandler = (e, identifier) => {
    // eslint-disable-next-line react/prop-types
    props.history.push(`/directory?categories=${identifier}`);
  };

  //TODO refactor Hero
  //TODO refactor subSlot
  return (
    <Layout>
      <div className="Home">
        <div className="Home__layout -hero">
          <div className="Home__subSlot -panel">
            <h2>Search by business name / category / location:</h2>
            <Search
              icon={searchIcon3}
              label="Search our directory"
              placeholder="Start typing..."
              tooltip="Try: 'Tea N' A Pie' or 'bakery' or 'Baguio City'"
              btnText="Search"
              btnClassName="Home__searchBtn"
              inputClassName="Home__search"
              handleChange={inputChangedHandler}
              handleSubmit={submitHandler}
            >
              <SearchResults
                data={searchResults}
                handleClick={(e, result) => resultClickHandler(e, result)}
              />
            </Search>
            <h3>Categories:</h3>

            <SvgButtons
              config={categoryIcons}
              handleClick={(e, identifier) =>
                iconButtonClickHandler(e, identifier)
              }
            />
          </div>
          <div className="Home__divider">
            <div className="Home__dividerText">or</div>
            <div className="Home__dividerLine"></div>
          </div>
          <div className="Home__subSlot -panel">
            <h2>Add your business to our directory. It's easy</h2>
            <NavLink
              to={`${props.authenticated ? "/account" : "/login"}`}
              className="Home__btnCta"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

Home.propTypes = {
  authenticated: PropTypes.bool
};

export default connect(mapStateToProps)(Home);
