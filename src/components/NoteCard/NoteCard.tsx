// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { useAppDispatch } from '../../app/hooks';
import { NoteType } from '../../types/NoteType';
import styles from './NoteCard.module.scss';

import { actions as notesActions } from '../../features/notes';

type Props = {
  note: NoteType;
};

export function NoteCard({ note }: Props) {
  const dispatch = useAppDispatch();

  const startEditing = () => {
    dispatch(notesActions.setEditingNote(note));
  };

  const deleteNote = () => {
    axios
      .delete(`http://localhost:5000/notes/${note.id}`)
      .then(() => {
        dispatch(notesActions.deleteNote(note.id));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  return (
    <article className={styles.noteCard}>
      <div className={styles.noteCard__container}>
        <h2 className={styles.noteCard__title}>{note.title}</h2>

        <p className={styles.noteCard__description}>{note.description}</p>
      </div>

      <button
        className={styles.noteCard__editBtn}
        type="button"
        onClick={startEditing}
      >
        edit
      </button>

      <button
        className={styles.noteCard__closeBtn}
        type="button"
        onClick={deleteNote}
      >
        X
      </button>
    </article>
  );
}
