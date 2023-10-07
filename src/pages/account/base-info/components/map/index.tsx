import { useEffect, useRef } from 'react';
import { Map } from 'react-bmapgl/dist';

const MyMap = (props: { initAddress: any }) => {
  const BMapGL = window.BMapGL;

  const { initAddress } = props;
  const mapRef = useRef<BMapGL.Map>();

  useEffect(() => {
    if (Object.keys(initAddress).length > 0) {
      mapRef.current?.centerAndZoom(new BMapGL.Point(initAddress.lon, initAddress.lat), 11);
    }

    return () => {
      try {
        mapRef.current?.clearOverlays();
      } catch (e) {}
    };
  }, [initAddress]);

  return (
    <Map
      center={
        {
          lng: initAddress?.lon || 116.402544,
          lat: initAddress?.lat || 39.928216,
        } as BMapGL.Point
      }
      zoom={11}
      ref={(ref) => (mapRef.current = ref?.map)}
    >
      {/*@ts-ignore*/}
    </Map>
  );
};

export default MyMap;
