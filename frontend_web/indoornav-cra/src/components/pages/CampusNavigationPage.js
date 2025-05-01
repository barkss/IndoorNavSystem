import React, { useEffect, useRef } from 'react';
import { getMapData, show3dMap } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css'; // Ensure this path is correct

const CampusNavigationPage = () => {
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

                    // Set each space to be interactive and its hover color to red.
                    mapData.getByType('space').forEach((space) => {
                        mapView.updateState(space, {
                            interactive: true,
                            hoverColor: 'red',
                        });
                    });


                    // Act on the click event to create a label with the space name that was clicked.
                    // If the space has no name, use the coordinate.
                    mapView.on('click', async (e) => {
                        if (e.spaces[0]?.name) { // Optional chaining to safely access name
                            mapView.Labels.add(e.coordinate, e.spaces[0].name);
                        } else {
                            mapView.Labels.add(e.coordinate, `Clicked: Lat: ${e.coordinate.latitude} Lon: ${e.coordinate.longitude}`);
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Mappedin map:', error);
            }
        };

        init();

        return () => {
            if (mapView && mapView.destroy) {
                mapView.destroy();
            }
        };
    }, []);

    return <div id="mappedin-map" ref={mapDiv} style={{ width: '100%', height: '500px' }} />;
};

export default CampusNavigationPage;