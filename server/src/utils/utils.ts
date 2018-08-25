export const getErrorMessages = (e: any) => {
  let errors: any[] = [];
  Object.keys(e).forEach(key => {
    if (e[key].hasOwnProperty("message")) {
      errors.push(e[key]);
    }
    if (typeof e[key] === "object" && e[key] != null) {
      const childErrorMessages = getErrorMessages(e[key]);
      errors = [...errors, childErrorMessages];
    }
  });
  return errors;
};
