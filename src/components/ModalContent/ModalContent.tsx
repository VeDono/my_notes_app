import { FC } from 'react';
import styles from './ModalContent.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import crossIcon from '../../images/icons/cross-icon.svg';
import { actions as notesActions } from '../../features/notes';

export const ModalContent: FC = () => {
  const { selectedNote } = useAppSelector((store) => store.notes);
  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(notesActions.clearSelectedNote());
  }

  return (
    <article className={styles.modalContent}>
      <h2 className={styles.modalContent__title}>{selectedNote?.title}</h2>
      <div className={styles.modalContent__description}>
        {selectedNote?.description}
      </div>

      <button
        onClick={() => closeModal()}
        type="button"
        className={styles.modalContent__btnClose}
      >
        <img src={crossIcon} alt="cross-icon" />
      </button>
    </article>
  );
};
