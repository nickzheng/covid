import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';
import React from 'react';
import dayjs from 'dayjs';
import { locations } from '@/utils/const';

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

// because React does not do deep comparisons, a custom hook is used
// see discussion in https://github.com/googlemaps/js-samples/issues/946
export function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export const formatDate = (d) => dayjs(d.format('YYYY-MM-DD')).format('YYYY-MM-DDT00:00:00.000');

export const getInitDate = () => formatDate(dayjs().subtract(1, 'day'));

export const getLast50DaysDate = () => {
  const last7DaysDate = [];
  for (let i = 50; i > 0; i--) {
    last7DaysDate.push(formatDate(dayjs().subtract(i, 'day')));
  }
  return last7DaysDate.sort().reverse();
};

export const addPosition = (d) => {
  return d
    .map((item) => {
      return {
        ...item,
        position: locations[`${item.state_name}-${item.county_name}`],
      };
    })
    .filter((item) => item.position);
};

export const getSuppression = () => Math.floor(Math.random() * 10 + 1);

export const formatData = (data) => {
  const result = [];
  data.forEach((i) => {
    result.push({
      ...i,
      value: parseFloat(i.cases_per_100k_7_day_count) || getSuppression(),
      report_date: new Date(i.report_date).toLocaleDateString(),
      category: 'Cases Per 100k 7 day Count',
    });
    result.push({
      ...i,
      value: parseFloat(i.percent_test_results_reported) || getSuppression(),
      report_date: new Date(i.report_date).toLocaleDateString(),
      category: 'Percent Test Results Reported',
    });
  });
  return result;
};
