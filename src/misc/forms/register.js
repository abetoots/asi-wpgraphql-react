import { initForm } from "./form-core";

const inputs = [
  {
    key: "username",
    label: "Username",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true,
      autoComplete: "off"
    },
    initialValue: ""
  },
  {
    key: "email",
    label: "Email",
    elType: "input",
    elementConfig: {
      type: "email",
      required: true,
      autoComplete: "off"
    },
    initialValue: ""
  },
  {
    key: "password",
    label: "Password",
    elType: "input",
    elementConfig: {
      type: "password",
      required: true,
      autoComplete: "off"
    },
    initialValue: ""
  }
];
export const useFormState = initForm(inputs);

export default inputs;
