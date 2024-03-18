// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

import { NoteForm } from '../NoteForm';
import { NoteGrid } from '../NoteGrid';

import styles from './NoteApp.module.scss';

import { actions as notesActions } from '../../features/notes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { SERVER_URL } from '../../config';
import { Loader } from '../Loader';
import { ModalContent } from '../ModalContent';
import { WaitMessage } from '../WaitMessage';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function NoteApp() {
  const dispatch = useAppDispatch();
  const { notes, selectedNote } = useAppSelector((store) => store.notes);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    axios
      .get(SERVER_URL)
      .then((res) => {
        dispatch(notesActions.setNote(res.data));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(`Err: ${err}`))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  function closeModal() {
    dispatch(notesActions.clearSelectedNote());
  }

  return (
    <section className={styles.noteApp}>
      <NoteForm />

      {!loaded && (
        <>
          <WaitMessage />

          <Loader />
        </>
      )}

      {notes.length > 0 && loaded && (
        <>
          <NoteGrid />
          <Modal
            isOpen={!!selectedNote}
            onRequestClose={() => closeModal()}
            style={customStyles}
            contentLabel="Modal window with your note 👀"
          >
            <ModalContent />
          </Modal>
        </>
      )}

      {notes.length === 0 && loaded && <WaitMessage />}
    </section>
  );
}
