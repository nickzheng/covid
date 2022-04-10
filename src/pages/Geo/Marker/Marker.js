import * as React from 'react';
import { levelMap } from '@/utils/const';

export default (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      const strokeColor = levelMap[options.point?.community_transmission_level]?.color;
      marker.setOptions({
        position: options.point.position,
        icon: {
          strokeColor,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
        },
        map: window.map,
      });
    }
  }, [marker, options]);

  React.useEffect(() => {
    if (marker) {
      ['click'].forEach((eventName) => google.maps.event.clearListeners(marker, eventName));
      if (marker) {
        marker.addListener('click', () => options.onSelectPoint(options.point));
      }
    }
  }, [marker, options]);

  return null;
};
