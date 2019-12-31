import faunadb from "faunadb";
import store from '../store'

export function AddPost() {

  let dbToken = store.getters["auth/currentUser"].app_metadata.db_token
  console.log("hello from posts model, db Token", dbToken)

  /* configure faunaDB Client with our secret */
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: dbToken
  })

  console.log(q, client)
  return client.query(q.Create(q.Collection('posts'),
    { data: { title: 'What I had for breakfast ..' } }
  ))
    .then((resp) => resp)
    .catch(error => error)

}

