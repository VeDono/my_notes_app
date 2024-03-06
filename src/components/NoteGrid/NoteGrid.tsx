import { useAppSelector } from '../../app/hooks';
import { NoteCard } from '../NoteCard';

import styles from './NoteGrid.module.scss';

export function NoteGrid() {
  const { notes } = useAppSelector((store) => store.notes);

  if (notes === null) {
    return (
      <section className={styles.noteGrid}>
        <div>No notes available.</div>
      </section>
    );
  }

  return (
    <section className={styles.noteGrid}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
}
