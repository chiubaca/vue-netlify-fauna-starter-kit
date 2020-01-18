import faunadb from "faunadb";
import store from "../store";

/* configure faunaDB Client with our secret */
export const q = faunadb.query;
// client needs to be mutable so it can dynamically re-initialise when a new user logs in.
// eslint-disable-next-line import/no-mutable-exports
export let client = new faunadb.Client({
  secret: store.getters["auth/currentUser"].app_metadata.db_token
});

// Its important we watch the current user object and update the fauna db client
// otherwise when switching accounts the previous users token is still cached in memory
// https://github.com/chiubaca/vue-netlify-fauna-starter-kit/issues/3
store.subscribe(mutation => {
  if (mutation.type === "auth/SET_CURRENT_USER") {
    client = new faunadb.Client({
      secret: mutation.payload.app_metadata.db_token
    });
  }
});
