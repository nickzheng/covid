import ProTable from '@ant-design/pro-table';
import dayjs from 'dayjs';
import { getPoints } from '@/services';
import { orderMap, selectedPointPropTypes } from '@/utils/const';

const TableChart = ({ selectedPoint }) => {
  return (
    <ProTable
      search={false}
      rowKey="report_date"
      dateFormatter="string"
      pagination={{ pageSize: 5 }}
      columns={[
        {
          title: 'Report date',
          width: 100,
          dataIndex: 'report_date',
          render: (_) => dayjs(_).format('YYYY-MM-DD'),
          sorter: true,
        },
        {
          title: 'New cases per 100k persons within the last 7 days',
          width: 340,
          dataIndex: 'cases_per_100k_7_day_count',
          align: 'right',
          sorter: true,
        },
        {
          title: 'Percentage of positive tests result during the last 7 days',
          width: 380,
          dataIndex: 'percent_test_results_reported',
          align: 'right',
          sorter: true,
        },
        {
          title: 'Community transmission level',
          width: 220,
          dataIndex: 'community_transmission_level',
          align: 'right',
          sorter: true,
        },
      ]}
      request={async (params, sorter, filter) => {
        const { state_name, county_name } = selectedPoint;
        const where = { state_name, county_name };
        let attribute = {
          where,
          limit: params.pageSize,
          offset: params.pageSize * (params.current - 1),
        };
        let order = null;
        Object.keys(sorter).forEach((key) => {
          order = `${key} ${orderMap[sorter[key]]}`;
        });
        if (order) {
          attribute = { ...attribute, order };
        }
        const data = await getPoints(attribute);
        const total = await getPoints({ where, select: 'count(*)' });
        return { data, success: true, total: total[0].count };
      }}
    />
  );
};

TableChart.propTypes = {
  selectedPoint: selectedPointPropTypes,
};

export default TableChart;
