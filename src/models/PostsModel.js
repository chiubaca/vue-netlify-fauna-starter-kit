import faunadb from "faunadb";
import store from '../store'

const dbToken = store.getters["auth/currentUser"].app_metadata.db_token
console.log("hello from posts model, db Token", dbToken)

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: dbToken
})

export function addPost(postData , journalID) {

  const me = q.Select("ref", q.Get(
        q.Ref("classes/users/self")));

  return client.query(q.Create(q.Collection("posts"), 
          {
            data: {
              ...postData,
              journal: q.Ref(q.Collection('journals'), journalID),
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

export function getPosts(journalID){

    // Get the Current Journal reference object
    // TODO: Wonder if we could just store the current journal ID object into a vuex,
    // this could save an additonal request to get the journal ID

    return client.query(q.Get(q.Ref(`collections/journals/${journalID}`))) 
      .then((journal) => {
        console.log("Got Journal", journal)

        return client.query(q.Map(
            q.Paginate(q.Match(q.Index("posts_by_journal"),journal.ref)),
            (ref) => q.Get(ref) // fauna lambda function , what does "Get()" do?
          ))
          .then(resp => {
            console.log("got posts", resp);
            return resp
          })
      })
      .catch(err => console.error("couldnt get posts", err));
}

