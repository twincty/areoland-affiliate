import axios from "axios";

let baseURL = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else {
  baseURL = "https://api-dot-areoland.appspot.com";
}

const API = axios.create({
  baseURL: baseURL,
});

export const signupAPI = async (name, email, password) => {
  try {
    const result = await API.post("/affiliate_program/new-user", {
      name,
      email,
      password,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (signupAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const signinAPI = async (email, password) => {
  try {
    const result = await API.post("/affiliate_program/login", {
      email,
      password,
    });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (signinAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const dashboardAPI = async (token) => {
  try {
    const result = await API.post("/dashboard", { token });
    return result.data;
  } catch (e) {
    console.log("FAILED: unable to perform API request (dashboardAPI)");
    console.log(e);
    console.log(e.response.data);
    return e.response.data;
  }
};
