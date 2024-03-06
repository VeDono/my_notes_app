// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './NoteForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as notesActions } from '../../features/notes';

export function NoteForm() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const dispatch = useAppDispatch();
  const { notes, editingNote } = useAppSelector((store) => store.notes);

  useEffect(() => {
    if (editingNote) {
      setInputValue(editingNote.title);
      setTextareaValue(editingNote.description);
    } else {
      setInputValue('');
      setTextareaValue('');
    }
  }, [editingNote]);

  const resetFields = () => {
    setInputValue('');
    setTextareaValue('');
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = {
      title: inputValue,
      description: textareaValue,
      id: editingNote ? editingNote.id : crypto.randomUUID(),
    };

    if (editingNote) {
      axios
        .put(`http://localhost:5000/notes/${note.id}`, note)
        .then(() => {
          dispatch(notesActions.updateNote(note));
          dispatch(notesActions.setEditingNote(null));
          resetFields();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:5000/notes', note)
        .then(() => {
          dispatch(notesActions.setNote([...notes, note]));
          resetFields();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
  };

  return (
    <form className={styles.noteForm} onSubmit={submitHandler}>
      <input
        type="text"
        className={styles.noteForm__input}
        placeholder="Title"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <textarea
        name="content"
        id="12"
        cols={30}
        rows={10}
        className={styles.noteForm__textarea}
        placeholder="Content"
        value={textareaValue}
        onChange={(event) => setTextareaValue(event.target.value)}
      />

      <button
        type="submit"
        className={styles.noteForm__btnSubmit}
        aria-label="submitBtn"
      >
        {editingNote ? 'Save Edits' : 'Add Note'}
      </button>
    </form>
  );
}
