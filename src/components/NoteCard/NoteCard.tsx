// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import { useAppDispatch } from '../../app/hooks';
import { NoteType } from '../../types/NoteType';
import styles from './NoteCard.module.scss';

import { actions as notesActions } from '../../features/notes';

import { SERVER_URL } from '../../config';

import trashCanIcon from '../../images/icons/trash-can-icon.svg';
import editPenIcon from '../../images/icons/pen-to-square-icon.svg';
import scaleNoteIcon from '../../images/icons/scale-note-icon.svg';

type Props = {
  note: NoteType;
};

export function NoteCard({ note }: Props) {
  const dispatch = useAppDispatch();

  const selectNote = () => {
    dispatch(notesActions.setSelectedNote(note));
  };

  const startEditing = () => {
    dispatch(notesActions.setEditingNote(note));
  };

  const deleteNote = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete the note?')) {
      axios
        .delete(`${SERVER_URL}/${note.id}`)
        .then(() => {
          dispatch(notesActions.deleteNote(note.id));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
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
        <img src={editPenIcon} alt="edit-pen-icon" />
      </button>

      <button
        className={styles.noteCard__closeBtn}
        type="button"
        onClick={deleteNote}
      >
        <img src={trashCanIcon} alt="trash-can-icon" />
      </button>

      <button
        className={styles.noteCard__selectBtn}
        type="button"
        onClick={selectNote}
      >
        <img src={scaleNoteIcon} alt="scale-note-icon" />
      </button>
    </article>
  );
}
