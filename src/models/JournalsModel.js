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
