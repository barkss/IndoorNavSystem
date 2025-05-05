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

                    // Act on the click event to focus the camera on the clicked space.
                    mapView.on('click', async (e) => {
                        if (e.spaces && e.spaces.length > 0) {
                            mapView.Camera.focusOn(e.spaces[0]);
                        }
                    });

                    // Optional: Add labels for all named spaces (as in your original code)
                    mapData.getByType('space')
                        .filter(space => space.name)
                        .forEach(space => {
                            mapView.Labels.add(space, space.name);
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