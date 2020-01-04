import faunadb from "faunadb";
import store from '../store'

const dbToken = store.getters["auth/currentUser"].app_metadata.db_token
console.log("hello from posts model, db Token", dbToken)

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: dbToken
})

export function createJournal(journalData) {

  const me = q.Select("ref", q.Get(
        q.Ref("classes/users/self")));

  return client.query(q.Create(q.Collection("journals"), 
          {
            data: {
              ...journalData,
              owner: q.Select("ref", q.Get(q.Ref("classes/users/self")))
              },
            permissions: {
              read: me,
              write: me
            }
          }))
    .then((resp) => resp)
    .catch(error => error)
}

export function getJournals(){

    return client.query(
      q.Map(
        q.Paginate(
          q.Match( // todo use lists_by_owner
            q.Ref("indexes/all_journals"))), (ref) => q.Get(ref)))
      .then((r) => r.data);
}

