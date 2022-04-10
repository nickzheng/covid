import PropTypes from 'prop-types';
import { useState } from 'react';
import LineChart from './LineChart/LineChart';
import style from './Detail.less';
import TableChart from './TableChart/TableChart';

const Detail = ({ selectedPoint, onClose }) => {
  const [mode, setMode] = useState(false);
  return (
    <div className={style.detail}>
      <div className={style.close} onClick={onClose}>
        x
      </div>
      <div className={style.title}>
        {selectedPoint && (
          <span>
            {selectedPoint.state_name} {selectedPoint.county_name} {selectedPoint.fips_code}
          </span>
        )}
        <div className={style.tableLink} onClick={() => setMode(!mode)}>
          Switch To Table
        </div>
      </div>
      {selectedPoint && (
        <div className={style.content}>
          {mode ? (
            <TableChart selectedPoint={selectedPoint} />
          ) : (
            <LineChart selectedPoint={selectedPoint} />
          )}
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedPoint: PropTypes.object,
};

export default Detail;
