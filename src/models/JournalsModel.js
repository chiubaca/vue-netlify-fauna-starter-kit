import { q, client } from "../helpers/init-db";

export function createJournal(journalData) {
  const me = q.Identity();

  return client
    .query(
      q.Create(q.Collection("journals"), {
        data: {
          ...journalData,
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

export function getJournals() {
  return client
    .query(
      q.Map(
        q.Paginate(
          q.Match(
            // todo use lists_by_owner
            q.Ref("indexes/all_journals")
          )
        ),
        ref => q.Get(ref)
      )
    )
    .then(resp => resp);
}

export function deleteJournal(journalRefID) {
  return client
    .query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index("posts_by_journal"),
            q.Ref(q.Collection("journals"), journalRefID)
          )
        ),
        //deletes all posts within the given journal
        q.Lambda("X", q.Delete(q.Select("ref", q.Get(q.Var("X")))))
      )
      //delete the journal
    )
    .then(resp => resp)
    .catch(err => err);
}
