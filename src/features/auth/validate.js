export const checkValidData = (email, password) => {
  //testing
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  //if false
  if (!isEmailValid) return "email is not valid";
  if (!isPasswordValid) return "password is not strong";

  return null; //if true
};
