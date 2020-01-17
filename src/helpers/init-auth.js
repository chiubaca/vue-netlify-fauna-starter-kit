import GoTrue from "gotrue-js";
import store from '../store'

// https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp/57421931#57421931
const IPv4Pattern = /\b((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b/;
const hostName = document.location.hostname
const APIUrl = `https://${hostName}/.netlify/identity`
export let Auth = {}

export function initAuth(){
  
  if(hostName.match(IPv4Pattern) || hostName ==="localhost"){
    console.log("Looks like your in a dev environment", hostName)
    store.commit("app/SET_DEV_ENV", true)
    console.log("initialising Go True client with", store.getters["app/siteURL"])
    Auth = new GoTrue({
          APIUrl: `https://${store.getters["app/siteURL"]}/.netlify/identity`,
          audience: "",
          setCookie: false
        })
    
    store.subscribe((mutation) => {
      if (mutation.type === "app/SET_SITE_URL"){
        console.log("re-initialising Go True client with", store.getters["app/siteURL"])
        Auth = new GoTrue({
          APIUrl: `https://${store.getters["app/siteURL"]}/.netlify/identity`,
          audience: "",
          setCookie: false
        })
      }
    })

    return
  }

  console.log("Initialising Go True client with ", APIUrl)
  Auth = new GoTrue({
    APIUrl: APIUrl,
    audience: "",
    setCookie: false
  })
}