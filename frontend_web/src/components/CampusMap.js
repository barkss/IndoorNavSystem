import React from 'react';
import { MapView, useMapData } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';

function CampusMap({ apiKey, apiSecret, mapId }) {
    const { isLoading, error, mapData } = useMapData({
        key: apiKey,
        secret: apiSecret,
        mapId: mapId,
    });

    if (isLoading) {
        return <div>Loading Campus Map...</div>;
    }

    if (error) {
        return <div>Error Loading Campus Map: {error.message}</div>;
    }

    return mapData ? <MapView mapData={mapData} /> : null;
}

export default CampusMap;