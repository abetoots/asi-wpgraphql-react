import { initForm } from "./form-core";
import { categories } from "@Shared/categories";
import { provinces } from "@Shared/lists";
import {
  FULL_NAME,
  BUSINESS_NAME,
  BUSINESS_CATEGORIES,
  STREET,
  CITY,
  PROVINCE,
  COUNTRY,
  PHONE_NUM,
  SOCIAL_WEBSITE,
  TEL_NUM,
  SOCIAL_FACEBOOK,
  BUSINESS_DESCRIPTION
} from "@Shared/constants";

const inputs = [
  //   {
  //     key: PROFILE_PHOTO,
  //     label: "Upload Profile Photo",
  //     elType: "input",
  //     elementConfig: {
  //       type: "file",
  //       accept: "image/png, image/jpeg"
  //     },
  //     customProps: {
  //       btnText: "Choose File"
  //     },
  //     initialValue: {
  //       file: "",
  //       preview: "",
  //       url: ""
  //     }
  //   },
  {
    key: FULL_NAME,
    label: "Full Name",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true
    },
    initialValue: ""
  },
  {
    key: BUSINESS_NAME,
    label: "Business Name",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true
    },
    initialValue: ""
  },
  {
    key: BUSINESS_CATEGORIES,
    label: "Category",
    elType: "checkbox",
    elementConfig: {
      options: categories
    },
    initialValue: [""]
  },

  {
    key: STREET,
    label: "House No. / Street / Barangay",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true
    },
    initialValue: ""
  },
  {
    key: CITY,
    label: "Municipality/City",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true
    },
    initialValue: ""
  },
  {
    key: PROVINCE,
    label: "Province",
    elType: "select",
    elementConfig: {
      required: true,
      options: provinces
    },
    initialValue: ""
  },
  {
    key: COUNTRY,
    label: "Country",
    elType: "select",
    elementConfig: {
      required: true,
      options: ["", "Philippines"]
    },
    initialValue: "Philippines"
  },
  {
    key: PHONE_NUM,
    label: "Phone Number",
    elType: "input",
    elementConfig: {
      type: "number",
      required: true
    },
    iconConfig: {
      icon: ["fas", "mobile-alt"],
      position: "inside"
    },
    initialValue: ""
  },
  {
    key: TEL_NUM,
    label: "Tel. Number",
    elType: "input",
    elementConfig: {
      type: "number"
    },
    iconConfig: {
      icon: ["fas", "phone"],
      position: "inside"
    },
    initialValue: ""
  },
  {
    key: SOCIAL_WEBSITE,
    label: "Website",
    elType: "input",
    elementConfig: {
      type: "url",
      //TODO update server validation
      pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    },
    iconConfig: {
      icon: ["fas", "globe"],
      position: "inside"
    },
    initialValue: ""
  },
  {
    key: SOCIAL_FACEBOOK,
    label: "Facebook",
    elType: "input",
    elementConfig: {
      type: "url",
      pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    },
    customProps: {
      icon: ["fab", "facebook"],
      position: "inside"
    },
    initialValue: ""
  },
  {
    key: BUSINESS_DESCRIPTION,
    label: "Description",
    elType: "editor",
    elementConfig: {},
    initialValue: ""
  }
];

export const useFormState = initForm(inputs);

export default inputs;
