import React, { useEffect, useRef } from 'react';
import { getMapData, show3dMap } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css';
import BaseCampusMap from '../BaseCampusMap'; // Assuming you have a basic map component

const BlueDotPage = () => {
    const mapDiv = useRef(null);
    let mapView = null;

    useEffect(() => {
        const options = {
            key: 'mik_lFDgPjy2UrBv15bkB54580757',
            secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c',
            mapId: '67dcbbef213bd1000bd6bc3b',
        };

        const init = async () => {
            try {
                const mapData = await getMapData(options);
                if (mapDiv.current) {
                    mapView = await show3dMap(mapDiv.current, mapData);

                    // Auto add labels to the map.
                    mapView.auto();

                    // Enable Blue Dot with default settings
                    mapView.BlueDot.enable();
                    mapView.BlueDot.follow('position-only');

                    // Start the Blue Dot at the center of the map
                    mapView.BlueDot.update({
                        accuracy: 4,
                        latitude: mapData.mapCenter.latitude,
                        longitude: mapData.mapCenter.longitude
                    });

                    // Listen for click events on the map
                    mapView.on("click", async (event) => {
                        if (event.coordinate) {
                            // Follow mode is disabled when clicking on the map. Re-enable it.
                            mapView.BlueDot.follow('position-only');
                            // Update Blue Dot position to where the user clicked.
                            mapView.BlueDot.update({
                                accuracy: 4,
                                floorOrFloorId: mapView.currentFloor,
                                latitude: event.coordinate.latitude,
                                longitude: event.coordinate.longitude
                            });
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Mappedin map with Blue Dot:', error);
            }
        };

        init();

        return () => {
            if (mapView && mapView.destroy) {
                mapView.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h1>Blue Dot Navigation</h1>
            <BaseCampusMap ref={mapDiv} />
        </div>
    );
};

export default BlueDotPage;