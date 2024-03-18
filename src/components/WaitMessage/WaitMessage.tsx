import { FC } from 'react';

import styles from './WaitMessage.module.scss';

export const WaitMessage: FC = () => {
  return (
    <div className={styles.waitMessage}>
      <h3>
        Sorry, I deployed the server on a free hosting, so if you see this{' '}
        <br />
        message, it’s trying to wake up, please give it a little time 😥🫣.{' '}
        <br />
        <br />
        Thanks you for your time 😻.
      </h3>
    </div>
  );
};
