import { Line } from '@ant-design/charts';
import { useCallback, useEffect, useState } from 'react';
import { getPoints } from '@/services';
import { formatData } from '@/utils/utils';
import { selectedPointPropTypes } from '@/utils/const';

const LineChart = ({ selectedPoint: { state_name, county_name } }) => {
  const [data, setData] = useState();
  const fetchData = useCallback(async () => {
    const result = await getPoints({ where: { state_name, county_name } });
    setData(formatData(result));
  }, [state_name, county_name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Line
      data={data}
      xField="report_date"
      yField="value"
      seriesField="category"
      animation={{ appear: { animation: 'path-in', duration: 5000 } }}
    />
  );
};

LineChart.propTypes = {
  selectedPoint: selectedPointPropTypes,
};

export default LineChart;
