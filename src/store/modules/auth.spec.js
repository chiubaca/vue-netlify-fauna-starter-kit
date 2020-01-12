import authModule from './auth'

//State tests
// TODO: cant get a basic unit working here
  test('random test', () => {
    console.log("authMod", authModule.state())
    expect(authModule.state().testData).toBe("some test data")
  })

