//TODO optimizations
export const exposeStylesWillReplace = (obj) => {
  const keyRef = new Set(Object.keys(obj));

  return (props = null) => {
    if (props) {
      const { classes } = props;
      //TODO maybe replace with typechecking
      try {
        if (classes) {
          for (let [key, val] of Object.entries(classes)) {
            if (keyRef.has(key)) {
              obj[key] = `${val}`; //replace the class, not merge
            } else {
              if (process.env.NODE_ENV !== "production") {
                console.error(`@Styles/api: the key ${key} provided to the classes prop is not implemented in this component.
                You can only override one of the following: ${[
                  ...keyRef,
                ].join()}.`);
              }
            }
          }
        }
      } catch (err) {
        console.log("@Styles/api: Error occured!", err);
      }
    }

    return obj;
  };
};

export const exposeStylesWillMerge = (obj) => {
  const keyRef = new Set(Object.keys(obj));

  return (props = null) => {
    if (props) {
      const { classes } = props;
      //TODO maybe replace with typechecking
      try {
        if (classes) {
          for (let [key, val] of Object.entries(classes)) {
            if (keyRef.has(key)) {
              obj[key] = `${obj[key]} ${val}`; //merge by appending the class
            } else {
              if (process.env.NODE_ENV !== "production") {
                console.error(`@Styles/api: the key ${key} provided to the classes prop is not implemented in this component.
                You can only override one of the following: ${[
                  ...keyRef,
                ].join()}.`);
              }
            }
          }
        }
      } catch (err) {
        console.log("@Styles/api: Error occured!", err);
      }
    }

    return obj;
  };
};
