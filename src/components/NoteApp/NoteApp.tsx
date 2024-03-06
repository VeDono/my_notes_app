// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useEffect } from 'react';

import { NoteForm } from '../NoteForm';
import { NoteGrid } from '../NoteGrid';

import styles from './NoteApp.module.scss';

import { actions as notesActions } from '../../features/notes';
import { useAppDispatch } from '../../app/hooks';

export function NoteApp() {
  const port = 5000;
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:${port}/notes`)
      .then((res) => {
        dispatch(notesActions.setNote(res.data));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(`Err: ${err}`));
  }, [dispatch]);

  return (
    <section className={styles.noteApp}>
      <NoteForm />
      <NoteGrid />
    </section>
  );
}
