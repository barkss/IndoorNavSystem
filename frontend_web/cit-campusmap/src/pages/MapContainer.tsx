// MapContainer.tsx
import React, { useState, useEffect } from 'react';
import { getMapData, show3dMap, MapData, MapView } from '@mappedin/mappedin-js';
import "@mappedin/mappedin-js/lib/index.css";


interface MapContainerProps {
    children: React.ReactNode;
}

interface MapContextType {
    mapData: MapData | null;
    mapView: MapView | null;
}

export const MapContext = React.createContext<MapContextType>({
    mapData: null,
    mapView: null,
});

export const MapContextProvider: React.FC<MapContainerProps> = ({ children }) => {
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [mapView, setMapView] = useState<MapView | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initMap = async () => {
            const options = {
                key: 'mik_lFDgPjy2UrBv15bkB54580757',
                secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c',
                mapId: '67dcbbef213bd1000bd6bc3b',
            };

            try {
                const data = await getMapData(options);
                setMapData(data);
                const view = await show3dMap(
                    document.getElementById('mappedin-map') as HTMLDivElement,
                    data
                );
                setMapView(view);
            } catch (err: any) {
                setError(err.message || 'Failed to initialize map.');
                console.error('Error initializing map:', err);
            } finally {
                setLoading(false);
            }
        };

        initMap();
    }, []);

    if (loading) {
        return <div>Loading Map...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <MapContext.Provider value={{ mapData, mapView }}>
            {children}
        </MapContext.Provider>
    );
};