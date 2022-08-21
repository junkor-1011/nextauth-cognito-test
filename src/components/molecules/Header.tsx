import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  username: string;
  signOutCallback: () => void;
};

const Header: React.FC<HeaderProps> = ({ username, signOutCallback }) => (
  <header>
    <div className={styles.wrapper}>
      <span>
        <h1>AppTitle</h1>
      </span>
      <span style={{ width: '300px' }}>
        <p>
          Logined as <span style={{ fontWeight: 'bold', color: 'red' }}>{username}</span>
          <button type="button" style={{ alignItems: 'right' }} onClick={() => signOutCallback()}>
            Sign Out
          </button>
        </p>
      </span>
    </div>
  </header>
);
export default Header;
