import { initForm } from "./form-core";
import { categories } from "@Shared/categories";
import { provinces } from "@Shared/lists";

const inputs = [
  {
    key: "categories",
    label: "Category",
    elType: "checkbox",
    elementConfig: {
      options: categories
    },
    initialValue: ""
  },
  {
    key: "city",
    label: "Municipality/City",
    elType: "input",
    elementConfig: {
      type: "text",
      autoComplete: "none"
    },
    initialValue: ""
  },
  {
    key: "province",
    label: "Province",
    elType: "select",
    elementConfig: {
      options: provinces
    },
    initialValue: ""
  },
  {
    key: "country",
    label: "Country",
    elType: "select",
    elementConfig: {
      options: ["", "Philippines"]
    },
    initialValue: ""
  }
];

export const useFormState = initForm(inputs);

export default inputs;
