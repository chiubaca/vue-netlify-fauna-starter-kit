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

/**
 *
 * @param {*} journal - Fuana journal object
 */
export function deleteJournal(journal) {
  //deletes all posts within the given journal
  return client
    .query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index("posts_by_journal"),
            q.Ref(q.Collection("journals"), journal.ref.value.id)
          )
        ),
        q.Lambda("X", q.Delete(q.Select("ref", q.Get(q.Var("X")))))
      )
    )
    .then(() => {
      //delete the journal
      return client.query(q.Delete(journal.ref));
    })
    .catch(err => err);
}

/**
 *
 * @param {object} journalRefID - faunaDb Journal object
 * @param {string} newTitle - new title for journal
 */
export function updateJournalTitle(journalRefID, newTitle) {
  return client
    .query(
      q.Update(q.Ref(q.Collection("journals"), journalRefID), {
        data: { title: newTitle }
      })
    )
    .then(resp => resp)
    .catch(err => err);
}
