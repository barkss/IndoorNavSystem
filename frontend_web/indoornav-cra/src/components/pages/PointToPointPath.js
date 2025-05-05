import React, { useEffect, useRef, useState } from 'react';
import { getMapData, show3dMap } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css';

const PointToPointPath = () => {
    const mapDiv = useRef(null);
    let mapView = null;
    let startSpace = null;
    let path = null;
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    useEffect(() => {
        const options = {
            key: 'mik_lFDgPjy2UrBv15bkB54580757',
            secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c',
            mapId: '67dcbbef213bd1000bd6bc3b',
        };

        const init = async () => {
            setIsLoading(true); // Set loading to true when initialization starts
            try {
                const mapData = await getMapData(options);
                if (mapDiv.current) {
                    mapView = await show3dMap(mapDiv.current, mapData);

                    const setSpacesInteractive = (interactive) => {
                        mapData.getByType('space').forEach((space) => {
                            mapView.updateState(space, {
                                interactive: interactive,
                                hoverColor: interactive ? 'red' : null,
                            });
                        });
                    };
                    setSpacesInteractive(true);

                    // Add labels for all named spaces
                    mapData.getByType('space')
                        .filter(space => space.name)
                        .forEach(space => {
                            mapView.Labels.add(space, space.name);
                        });

                    mapView.on('click', async (e) => {
                        console.log('Map Clicked', e);

                        if (path && (!e || !e.spaces || e.spaces.length === 0)) {
                            // If a path exists and the background is clicked, remove the path
                            console.log('Path exists, removing due to background click...');
                            mapView.Paths.remove(path);
                            path = null;
                            startSpace = null;
                            setSpacesInteractive(true);
                            console.log('Path Removed (on background click)');
                            return; // Exit the function after removing the path
                        }

                        if (!e || !e.spaces || e.spaces.length === 0) {
                            console.log('No space clicked.');
                            return;
                        }

                        const clickedSpace = e.spaces[0];
                        console.log('Clicked Space:', clickedSpace);
                        console.log('Current Path Variable:', path);
                        console.log('Current Start Space Variable:', startSpace);

                        if (path && clickedSpace) {
                            // If a path exists and another space is clicked, remove the path and reset
                            console.log('Path exists, removing due to new space click...');
                            mapView.Paths.remove(path);
                            path = null;
                            startSpace = clickedSpace; // Set the new clicked space as the start
                            setSpacesInteractive(true);
                            console.log('Path Removed, New Start Space Selected:', startSpace);
                        } else if (!startSpace && clickedSpace) {
                            startSpace = clickedSpace;
                            console.log('Start Space Selected:', startSpace);
                        } else if (startSpace && !path && clickedSpace) {
                            const directions = mapData.getDirections(startSpace, clickedSpace);
                            if (directions && directions.coordinates && directions.coordinates.length > 0) {
                                path = mapView.Paths.add(directions.coordinates, {
                                    nearRadius: 0.5,
                                    farRadius: 0.5,
                                });
                                console.log('Path Drawn:', path);
                                setSpacesInteractive(false);
                            } else {
                                console.log('No directions found.');
                                setAlertMessage('Directions not found between the selected areas. Please try selecting different locations.');
                                setShowAlert(true);
                            }
                            startSpace = null; // Reset startSpace after drawing (or failing to draw)
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Mappedin map:', error);
                setAlertMessage('Failed to load the map. Please try again later.');
                setShowAlert(true);
            } finally {
                setIsLoading(false); // Set loading to false when initialization completes (success or failure)
            }
        };

        init();

        return () => {
            if (mapView && mapView.destroy) {
                mapView.destroy();
            }
        };
    }, []);

    const loadingStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 1000, // Ensure it's on top of the map container
        textAlign: 'center',
        fontSize: '1.2em',
    };

    const alertStyle = {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 1001, // Ensure it's on top of the loading indicator and map
        textAlign: 'center',
    };

    const alertButtonStyle = {
        marginTop: '10px',
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={{ position: 'relative' }}> {/* Make the container relative for absolute positioning */}
            {isLoading && (
                <div style={loadingStyle}>
                    Please wait, the map is loading...
                </div>
            )}
            {showAlert && (
                <div style={alertStyle}>
                    {alertMessage}
                    <button onClick={() => setShowAlert(false)} style={alertButtonStyle}>
                        OK
                    </button>
                </div>
            )}
            <div id="mappedin-map" ref={mapDiv} style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default PointToPointPath;