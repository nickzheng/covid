import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { ServerProvider } from '@/hooks/context';

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      <ServerProvider>{children}</ServerProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
