export const authReducer = (
  state = { name: "Fiston", role: "Seller" },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT_USER":
      return action.payload;

    default:
      return state;
  }
};
