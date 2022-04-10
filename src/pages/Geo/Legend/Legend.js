import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Legend.less';
import { levelMap } from '@/utils/const';

const Legend = ({ children }) => {
  return (
    <div className={styles.legend}>
      <div className={styles.header}>
        <div>COVID-19 Community Transmission Level</div>
        <div>{children}</div>
      </div>

      <div className={styles.symbols}>
        {Object.keys(levelMap).map((key) => {
          return (
            <div className={styles.symbol} key={key}>
              <div className={styles.symbolIcon} style={{ background: levelMap[key].color }} />
              <div>{levelMap[key].description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Legend.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Legend;
