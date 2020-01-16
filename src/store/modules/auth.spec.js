import authModule from './auth'

//State tests
describe('auth/state', () => {
  test('currentUser is null by default', () => {
    expect(authModule.state().currentUser).toBe(null)
  })

  test('GoTrueAuth is null by default', () => {
    expect(authModule.state().GoTrueAuth).toBe(null)
  })
})

//Getters tests
describe('auth/getters', () => {
  test('loggedIn getter returns false if currentUser is null', () => {
    const state = { currentUser: null }
    expect(authModule.getters.loggedIn(state)).toBe(false)
  })

  test('loggedIn getter return true if currentUser is contains data', () => {
    const state = { currentUser:  {"user data": "some user data"}}
    expect(authModule.getters.loggedIn(state)).toBe(true)
  })

  test('currentUser getter mirrors currentUser state', () => {
    const state = { currentUser: null }
    expect(authModule.getters.currentUser(state)).toBe(null)
    const state2 = { currentUser:  {"user data": "some user data"}}
    expect(authModule.getters.currentUser(state2)).toEqual({"user data": "some user data"})
  })

  test('GoTrueAuth getter mirrors GoTrueAuth state', () => {
    const state = { GoTrueAuth: {
                      "api": {"apiURL":"https://<YOUR-SITE>.netlify.com/.netlify/identity"},
                      "setCookie": false
                      } 
                  }
    expect(authModule.getters.GoTrueAuth(state)).toEqual({
                        "api": {"apiURL":"https://<YOUR-SITE>.netlify.com/.netlify/identity"},
                        "setCookie": false
                        })
    const state2 = { GoTrueAuth: null }
    expect(authModule.getters.GoTrueAuth(state2)).toBe(null)
  })
})

//Mutations tests
describe('auth/mutations', () => {
  test('test', () => {
  })

  //TODO
  // - SET_GOTRUE
  // - SET_CURRENT_USER

})

//Actions tests
describe('auth/actions', () => {
  test('test', () => {
  })

  //TODO
  // - invokeSignupFunction
  // - attemptLogin
  // - attemptExternalLogin
  // - completeExternalLogin
  // - attemptSignup
  // - attemptConfirmation
  // - attemptLogout
  // - getUserJWTToken
  // - getCurrentUser
  // - initAuth
})