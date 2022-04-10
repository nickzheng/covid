import PropTypes from 'prop-types';
import React from 'react';
import style from './DateSelector.less';
import { getLast50DaysDate } from '@/utils/utils';

const DateSelector = ({ onChange }) => {
  return (
    <div className={style.panel}>
      <label className={style.label}>Report Date:</label>
      <select onChange={(e) => onChange(e.currentTarget.value)}>
        {getLast50DaysDate().map((item) => (
          <option value={item} key={item}>
            {new Date(item).toLocaleDateString()}
          </option>
        ))}
      </select>
    </div>
  );
};

DateSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DateSelector;
