import { q, client } from "../helpers/init-db";

/**
 *
 * @param {object} postData - posts data object
 * @param {string} journalID - the journal id which corresponds to a FuanaDB ref number
 */
export function addPost(postData, journalID) {
  const me = q.Identity();

  return client
    .query(
      q.Create(q.Collection("posts"), {
        data: {
          ...postData,
          journal: q.Ref(q.Collection("journals"), journalID),
          owner: me
        },
        permissions: {
          read: me,
          write: me
        }
      })
    )
    .then(resp => resp)
    .catch(error => error);
}

/**
 *
 * @param {string} journalID
 */
export function getPosts(journalID) {
  // Get the Current Journal reference object
  // TODO: Wonder if we could just store the current journal ID object into a vuex,
  // this could save an additonal request to get the journal ID

  return client
    .query(q.Get(q.Ref(`collections/journals/${journalID}`)))
    .then(journal => {
      return client
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index("posts_by_journal"), journal.ref)),
            ref => q.Get(ref) // fauna lambda function , what does "Get()" do?
          )
        )
        .then(resp => resp);
    })
    .catch(err => err);
}

/**
 *
 * @param {object} refID - fauna ref object
 */
export function deletePost(refID) {
  return client
    .query(q.Delete(refID))
    .then(resp => resp)
    .catch(err => err);
}

/**
 *
 * @param {object} postRefID - faunaDb Post collection reference ID
 * @param {string} newPost - new post for journal
 */
export function updatePost(postRefID, newPostData) {
  return client
    .query(
      q.Update(q.Ref(q.Collection("posts"), postRefID), {
        data: newPostData
      })
    )
    .then(resp => resp)
    .catch(err => err);
}
