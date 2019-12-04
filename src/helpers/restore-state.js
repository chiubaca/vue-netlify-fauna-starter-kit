import store from '../store'

let savedUser = JSON.parse(localStorage.getItem("auth.currentUser")) ;

export default function () {

if (!savedUser){
console.log("No user found in local storage")
return
}

console.log("restoring the following user to app state", savedUser.email)

store.commit("auth/SET_CURRENT_USER", savedUser)
}