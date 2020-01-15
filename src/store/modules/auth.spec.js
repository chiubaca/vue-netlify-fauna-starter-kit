import authModule from './auth'

//State tests
describe('app/state', () => {
  test('test', () => {
    expect(authModule.state().testData).toBe("some test data")
  })


})
