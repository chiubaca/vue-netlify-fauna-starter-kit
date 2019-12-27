import GoTrue from "gotrue-js";

export const Auth = new GoTrue({
  APIUrl: process.env.VUE_APP_NETLIFY_URL + ".netlify/identity",
  audience: "",
  setCookie: false
})