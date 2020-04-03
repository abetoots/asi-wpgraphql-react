import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./FilterControls.scss";

//Components
import Form from "@Bits/Form/Form";
import Input from "@Bits/Input/Input";
import Search from "@Bits/Search/Search";

//Misc
import inputs, { useFormState } from "@Forms/filters";

const FilterControls = props => {
  const [formState, setFormState] = useFormState();

  const [activeFilters, setActiveFilters] = useState({});

  const [textVal, setTextVal] = useState("");

  useEffect(() => {
    setActiveFilters({
      ...activeFilters,
      ...formState
    });
  }, [formState]);

  useEffect(() => {
    setActiveFilters({
      ...activeFilters,
      search: textVal
    });
  }, [textVal]);

  return (
    <div className="FilterControls">
      <div className="FilterControls__slot -search">
        <Search
          handleChange={e => setTextVal(e.target.value)}
          handleSubmit={e => props.handleSubmit(e, activeFilters)}
          label="Search filter"
          btnText="Search"
          placeholder="Search..."
        />
      </div>

      <div className="FilterControls__slot -filters">
        <Form
          handleSubmit={e => props.handleSubmit(e, activeFilters)}
          btnText="Refine Search Results"
        >
          {inputs.map(input => {
            return (
              <Input
                state={formState}
                handler={(inputKey, inputValue) =>
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
      </div>
    </div>
  );
};

FilterControls.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default FilterControls;
