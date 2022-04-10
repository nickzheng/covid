import * as React from 'react';
import { useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import styles from './index.less';
import DateSelector from './DateSelector/DateSelector';
import Map from '@/pages/Geo/Map/Map';
import Legend from '@/pages/Geo/Legend/Legend';
import Marker from '@/pages/Geo/Marker/Marker';
import { useServer } from '@/hooks/hooks';
import { apiKey, initPosition, initZoom } from '@/utils/const';
import Detail from '@/pages/Geo/Detail/Detail';
import Loading from '@/pages/Geo/Loading/Loading';

export default () => {
  const [open, setOpen] = useState();
  const { loading, allPoints, setDate, selectedPoint, setSelectedPoint } = useServer();
  return (
    <div className={styles.geo}>
      <Loading loading={loading} />
      <Legend>
        <DateSelector onChange={(value) => setDate(value)} />
      </Legend>
      {open && <Detail selectedPoint={selectedPoint} onClose={() => setOpen(false)} />}
      <Wrapper apiKey={apiKey}>
        <Map center={initPosition} zoom={initZoom}>
          {allPoints.map((item, i) => (
            <Marker
              key={i}
              point={item}
              onSelectPoint={(point) => {
                setSelectedPoint(point);
                setOpen(true);
              }}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
