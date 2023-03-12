import auth_api from "../api/auth_api";
export type loginUser = {
  email: String;
  password: String;
};
export type updateUser = {
  email: String;
  imageURL: String;
  fullname: String;
};
const updateUserHandler = async (user: any, accessToken: any) => {
  try {
    const res = await auth_api.updateUser(user, accessToken);
    return res;
  } catch (err) {
    console.log("Fail to update " + err);
  }
};
const getUserHandler = async (user: any, accessToken: any) => {
  try {
    const res = await auth_api.getUser(user, accessToken);
    return res;
  } catch (err) {
    console.log("Fail to get user " + err);
  }
};

const logoutHandler = async (refreshToken: string) => {
  try {
    const res = await auth_api.logout(refreshToken);
    return res;
  } catch (err) {
    console.log("Fail to login " + err);
  }
};
const loginHandler = async (user: loginUser) => {
  try {
    const res = await auth_api.login(user);
    return res;
  } catch (err) {
    console.log("Fail to login " + err);
  }
};
export default {
  loginHandler,
  logoutHandler,
  updateUserHandler,
  getUserHandler,
};
