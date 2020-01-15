import authModule from './auth'

//State tests
describe('auth/state', () => {
  test('test', () => {
    expect(authModule.state().testData).toBe("some test data")
  })

  //TODO
  // - loggedIn
  // - currentUser
  // -  GoTrueAuth

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
describe('auth/mutations', () => {
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