import {
  AUTH_TOKEN,
  REFRESH_TOKEN,
  JWT_AUTH_EXPIRATION,
  AIM_REGISTER_ASI_MEMBER,
  BUSINESS_DESCRIPTION,
  BUSINESS_NAME,
  CITY,
  COUNTRY,
  FULL_NAME,
  PHONE_NUM,
  PROVINCE,
  SOCIAL_FACEBOOK,
  SOCIAL_WEBSITE,
  TEL_NUM,
  STREET,
  BUSINESS_CATEGORIES,
  USER_ID,
  ATTACHMENT_ID
} from "./constants";

export const getLoginMutation = (login, password) => {
  return `
    mutation LoginUser{
      login(
        input: {
          clientMutationId: ""
          username: "${login}"
          password: "${password}"
        }) {
        ${AUTH_TOKEN}
        ${REFRESH_TOKEN}
        user {
            ${JWT_AUTH_EXPIRATION}
            ${USER_ID}
            id
        }
      }
    }
  `;
};

export const getRefreshMutation = () => {
  return `
    mutation getRefreshMutation {
        refreshJwtAuthToken(input: {
            clientMutationId: "", 
            jwtRefreshToken: "${localStorage.getItem(REFRESH_TOKEN)}"
        }) {
            ${AUTH_TOKEN}
        }
    }
    `;
};

export const getRegisterUserMutation = (username, email, password) => {
  return `
  mutation RegisterAsiMember {
    registerUser(
        input: {
            clientMutationId: "", 
            username: "${username}", 
            aim: "${AIM_REGISTER_ASI_MEMBER}", 
            email: "${email}", 
            password: "${password}"
        }) {
            user {
                userId
            }
        }
    }
  `;
};

export const getUpdateAccountMutation = (data, userId) => {
  return `
    mutation updateAccount {
    updateAsiMemberAccount(
      (input: {
        clientMutationId: "",
        business_categories: ${data[BUSINESS_CATEGORIES] || ""},
        business_description: "${data[BUSINESS_DESCRIPTION] || ""}",
        business_name: "${data[BUSINESS_NAME] || ""}",
        street: "${data[STREET] || ""}",
        city: "${data[CITY] || ""}",
        province: "${data[PROVINCE] || ""}",
        country: "${data[COUNTRY] || ""}",
        full_name: "${data[FULL_NAME] || ""}",
        social_facebook: "${data[SOCIAL_FACEBOOK] || ""}",
        social_website: "${data[SOCIAL_WEBSITE] || ""}",
        phone_num: ${data[PHONE_NUM] || 0},
        tel_num: ${data[TEL_NUM] || 0},
        userId: ${userId}
      })
    ){
        business_categories
        business_description
        business_name
        street
        city
        province
        country
        full_name
        social_facebook
        social_website
        phone_num
        tel_num
    }
  }
  `;
};

export const getFetchAccountMutation = userId => {
  return `
       query getAsiMember {
        user(id: "${userId}", idType: DATABASE_ID) {
            business_description
            business_name
            street
            city
            province
            country
            full_name
            social_facebook
            social_website
            phone_num
            tel_num
            asi_role
            profile_photo {
                ${ATTACHMENT_ID}
                url
            }
        }
    }
    `;
};
