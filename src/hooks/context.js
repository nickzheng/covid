import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ServerContext } from './hooks';
import { getPoints } from '@/services';
import { addPosition, getInitDate } from '@/utils/utils';

export const ServerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [allPoints, setAllPoints] = useState([]);
  const [date, setDate] = useState(getInitDate());
  const [selectedPoint, setSelectedPoint] = useState(null);
  const fetchPoints = useCallback(async () => {
    setLoading(true);
    const result = await getPoints({ where: { report_date: date } });
    setAllPoints(addPosition(result));
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return (
    <ServerContext.Provider
      value={{
        loading,
        allPoints,
        setDate,
        selectedPoint,
        setSelectedPoint,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

ServerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
