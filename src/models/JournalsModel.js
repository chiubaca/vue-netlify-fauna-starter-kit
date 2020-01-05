import {q, client} from "../helpers/init-db"

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

