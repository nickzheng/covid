import * as React from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffectForMaps } from '@/utils/utils';

const Map = ({ children, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      window.map = new window.google.maps.Map(ref.current, {});
      setMap(window.map);
    }
  }, [ref, map]);
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={{ height: '100%' }} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

Map.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Map;
