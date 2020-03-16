import { q, client } from "../helpers/init-db";

/**
 *
 * @param {object} journalData - object containing the title of journal, could contain other data too in the future
 */
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
      q.Map(q.Paginate(q.Match(q.Ref("indexes/all_journals"))), ref =>
        q.Get(ref)
      )
    )
    .then(resp => resp);
}

/**
 *
 * @param {object} journal - Fuana journal object
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
      return client.query(q.Delete(journal.ref));
    })
    .catch(err => err);
}

/**
 *
 * @param {object} journalRefID - faunaDb journal collection reference ID
 * @param {string} newTitle - new title for journal
 */
export function updateJournalTitle(journalRefID, newTitle) {
  return client
    .query(
      q.Update(q.Ref(q.Collection("journals"), journalRefID), {
        //TODO - should think about spreading a journal object into here. See createJournal method.
        data: { title: newTitle }
      })
    )
    .then(resp => resp)
    .catch(err => err);
}
