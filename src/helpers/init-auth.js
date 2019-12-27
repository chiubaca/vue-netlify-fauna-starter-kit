import GoTrue from "gotrue-js";

//TODO - detect local host then use parameter from a config or something else

export const Auth = new GoTrue({
  APIUrl: "https://simple-vue-netlify-auth.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false
});

console.log("hello from go true helper", Auth)