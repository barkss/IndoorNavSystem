// src/MapContext.js
import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
    const [mapView, setMapView] = useState(null);

    return (
        <MapContext.Provider value={{ mapView, setMapView }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => {
    return useContext(MapContext);
};