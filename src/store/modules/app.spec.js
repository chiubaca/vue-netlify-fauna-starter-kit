import appModule from "./app";

//State tests
describe("app/state", () => {
  test("isDevEnvironment is false by default", () => {
    expect(appModule.state().isDevEnvironment).toBe(false);
  });

  test("siteURL is null by default", () => {
    expect(appModule.state().siteURL).toBe(null);
  });
});

//Getters tests
describe("app/getters", () => {
  test("isDevEnvironment getter mirrors state", () => {
    const state = {
      isDevEnvironment: false
    };
    expect(appModule.getters.isDevEnvironment(state)).toBe(false);
  });

  test("siteURL getter mirrors state", () => {
    const state = {
      siteURL: null
    };
    expect(appModule.getters.siteURL(state)).toBe(null);
  });
});

//Mutations tests
describe("app/mutations", () => {
  test("getters have the correct value after SET_DEV_ENV", () => {
    const state = {
      isDevEnvironment: false
    };
    appModule.mutations["SET_DEV_ENV"](state, true);
    expect(appModule.getters.isDevEnvironment(state)).toBe(true);
  });

  test("getters have the correct value after SET_SITE_URL", () => {
    const state = {
      siteURL: null
    };
    appModule.mutations["SET_SITE_URL"](state, "some_url");
    expect(appModule.getters.siteURL(state)).toBe("some_url");
  });
});
