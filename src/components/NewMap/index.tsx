import React, { FC, useState } from 'react';
import { AutoComplete, Map, Marker } from 'react-bmapgl';
import './styles.css';

interface NewMapProps {
  lng?: number;
  lat?: number;

  setStateToParent?: (lng: number, lat: number) => void;
}

const NewMap: FC<NewMapProps> = (props) => {
  const [lng, setLng] = useState(props.lng ? props.lng : 116.402544);

  const [lat, setLat] = useState(props.lat ? props.lat : 39.928216);

  const clickMap = (e) => {
    console.log(`e`, e);

    const latlng = e?.latlng;

    const lat = +latlng.lat.toFixed(6);

    const lng = +latlng.lng.toFixed(6);

    props.setStateToParent?.(lng, lat);

    setLat(lat);

    setLng(lng);
  };

  const onConfirm = (e: any) => {
    const BMapGL = window.BMapGL;

    const myGeo = new BMapGL.Geocoder();

    const addressValue = e.item.value;

    const address = `${addressValue.province}${addressValue.city}${addressValue.district}${addressValue.street}${addressValue.streetNumber}${addressValue.business}`;

    myGeo.getPoint(
      address,
      function (point: BMapGL.Point) {
        if (point) {
          setLat(point.lat);
          setLng(point.lng);

          props.setStateToParent?.(point.lng, point.lat);
        } else {
          alert('get address fail！');
        }
      },
      `${addressValue.city}`,
    );
  };

  return (
    <>
      <Map
        style={{ height: 450 }}
        onClick={(e) => {
          clickMap(e);
        }}
        center={{ lng: lng, lat: lat }}
        zoom="11"
      >
        {' '}
        <Marker position={{ lng: lng, lat: lat }} />
        {/*<input id="ac" style={{ zIndex: 1000 }} />*/}
        <AutoComplete
          onConfirm={(e) => {
            console.log(`onConfirm  `, e);

            onConfirm(e);
          }}
        />
      </Map>
    </>
  );
};

export { NewMap };
