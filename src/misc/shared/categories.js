import * as categoryicons from "../../assets/categoryicons/index";

export const categoryIcons = [
  {
    src: categoryicons.foodsAndDrinks,
    label: "Foods & Drinks",
    value: "foods-and-drinks"
  },
  {
    src: categoryicons.healthCare,
    label: "Health Care",
    value: "health-care"
  },
  {
    src: categoryicons.sports,
    label: "Sports",
    value: "sports"
  },
  {
    src: categoryicons.businessAndFinance,
    label: "Business & Finance",
    value: "business-and-finance"
  },
  {
    src: categoryicons.fashionAndClothing,
    label: "Fashion & Clothing",
    value: "fashion-and-clothing"
  },
  {
    src: categoryicons.online,
    label: "Online",
    value: "online"
  }
];

// construction
// sports
// packaging
// electronics
// business and finance
// fashion and clothing
// internet
// media
// tourism
// automotive and transport
// retail

export const categories = categoryIcons.map(obj => ({
  label: obj.label,
  value: obj.value
}));
