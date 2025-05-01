import React, { useEffect, useRef } from 'react';
import { getMapData, show3dMap } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css';
import BaseCampusMap from '../BaseCampusMap';

const NavigationDrawPage = () => {
    const mapDiv = useRef(null);
    let mapView = null;

    useEffect(() => {
        const options = {
            key: 'mik_lFDgPjy2UrBv15bkB54580757', // Your API key
            secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c', // Your API secret
            mapId: '67dcbbef213bd1000bd6bc3b', // Your map ID
        };

        const init = async () => {
            try {
                const mapData = await getMapData(options);
                if (mapDiv.current) {
                    mapView = await show3dMap(mapDiv.current, mapData);
                    console.log('mapView after show3dMap:', mapView);

                    mapData.getByType('space').forEach((space) => {
                        mapView.updateState(space, {
                            interactive: true,
                            hoverColor: 'red',
                        });
                    });

                    const spacesWithNames = mapData.getByType('space').filter(space => space.name);
                    const numSpaces = spacesWithNames.length;

                    if (numSpaces < 2) {
                        console.warn("Not enough named spaces to draw a path.");
                        return;
                    }

                    const firstSpace = spacesWithNames[Math.floor(Math.random() * numSpaces)];
                    let secondSpace = firstSpace;

                    // Ensure origin ≠ destination
                    while (secondSpace === firstSpace) {
                        secondSpace = spacesWithNames[Math.floor(Math.random() * numSpaces)];
                    }

                    const directions = mapData.getDirections(firstSpace, secondSpace);

                    if (directions && mapView.Navigation && mapView.Navigation.draw) {
                        mapView.Navigation.draw(directions, {
                            pathOptions: {
                                nearRadius: 1,
                                farRadius: 1,
                            },
                        });
                        console.log('Navigation drawn with random spaces:', firstSpace.name, 'to', secondSpace.name);
                    } else {
                        console.log('Directions not found or mapView.Navigation.draw is missing.');
                    }
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

    return (
        <div>
            <h1>Draw Navigation</h1>
            <BaseCampusMap ref={mapDiv} />
        </div>
    );
};

export default NavigationDrawPage;