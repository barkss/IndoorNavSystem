import React, { useEffect, useRef, useState } from 'react';
import { getMapData, show3dMap } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css';
import BaseCampusMap from '../BaseCampusMap'; // Assuming you have a basic map component


const NavigationDrawPage = () => {
    const mapDiv = useRef(null);
    const mapViewRef = useRef(null);
    const [mapDataState, setMapDataState] = useState(null);
    const [startPointQuery, setStartPointQuery] = useState('');
    const [endPointQuery, setEndPointQuery] = useState('');
    const [startPointResults, setStartPointResults] = useState([]);
    const [endPointResults, setEndPointResults] = useState([]);
    const [selectedStartPoint, setSelectedStartPoint] = useState(null);
    const [selectedEndPoint, setSelectedEndPoint] = useState(null);
    const [clickStep, setClickStep] = useState(0);
    const [path, setPath] = useState(null); // To store the drawn path
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        const options = {
            key: 'mik_lFDgPjy2UrBv15bkB54580757',
            secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c',
            mapId: '67dcbbef213bd1000bd6bc3b',
        };

        const initMap = async () => {
            try {
                const mapData = await getMapData(options);
                setMapDataState(mapData);

                if (mapDiv.current) {
                    const mapView = await show3dMap(mapDiv.current, mapData, {
                        venueOptions: {
                            theme: isNightMode ? 'dark' : 'light',
                        },
                    });
                    mapViewRef.current = mapView;

                    const setSpacesInteractive = (interactive) => {
                        mapData.getByType('space').forEach((space) => {
                            mapView.updateState(space, {
                                interactive: interactive,
                                hoverColor: interactive ? '#f26336' : null,
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
                }
            } catch (error) {
                console.error('Failed to initialize Mappedin map:', error);
            }
        };

        initMap();

        return () => {
            if (mapViewRef.current?.destroy) {
                mapViewRef.current.destroy();
            }
        };
    }, [isNightMode]); // Re-initialize map when isNightMode changes

    useEffect(() => {
        const mapView = mapViewRef.current;
        const mapData = mapDataState;

        if (mapView && mapData) {
            mapView.on('click', async (event) => {
                const { intersections } = event;
                if (!intersections || intersections.length === 0) return;

                const clickedObject = intersections.find(i => i.type === 'space');
                if (!clickedObject) return;

                const clickedSpace = clickedObject.object;

                if (clickStep === 0) {
                    setSelectedStartPoint(clickedSpace);
                    setStartPointQuery(clickedSpace.name || '');
                    console.log("Selected Start Space ID:", clickedSpace?.id); // Log start space ID
                    setClickStep(1);
                } else {
                    setSelectedEndPoint(clickedSpace);
                    setEndPointQuery(clickedSpace.name || '');
                    console.log("Selected End Space ID:", clickedSpace?.id); // Log end space ID
                    setClickStep(0);

                    if (mapData && mapView && selectedStartPoint && clickedSpace) {
                        const directions = mapData.getDirections(selectedStartPoint, clickedSpace);
                        if (directions && directions.coordinates && directions.coordinates.length > 0) {
                            if (path) {
                                mapView.Paths.remove(path);
                            }
                            const newPath = mapView.Paths.add(directions.coordinates, {
                                nearRadius: 0.5,
                                farRadius: 0.5,
                                color: '#1871fb',
                            });
                            setPath(newPath);
                            console.log('Navigation path drawn via map click.');
                        } else {
                            console.log('No directions found.');
                            if (path) {
                                mapView.Paths.remove(path);
                                setPath(null);
                            }
                        }
                    }
                }
            });
        }
    }, [mapDataState, clickStep, selectedStartPoint, selectedEndPoint, path]); // Dependencies for click listener

    const handleSearch = (query, isStart) => {
        if (!mapDataState) return;

        const results = mapDataState.getByType('space')
            .filter(space => space.name && space.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);

        if (isStart) {
            setStartPointResults(results);
        } else {
            setEndPointResults(results);
        }
    };

    const handleNavigateButtonClick = async () => {
        if (!mapDataState || !mapViewRef.current || !selectedStartPoint || !selectedEndPoint) {
            console.warn('Map data, map view, or selected points are missing.');
            return;
        }

        const directions = mapDataState.getDirections(selectedStartPoint, selectedEndPoint);
        if (directions && directions.coordinates && directions.coordinates.length > 0) {
            if (path) {
                mapViewRef.current.Paths.remove(path);
            }
            const newPath = mapViewRef.current.Paths.add(directions.coordinates, {
                color: '#1871fb',
                nearRadius: 0.5,
                farRadius: 0.5,
            });
            setPath(newPath);
            console.log('Navigation path drawn via button.');
        } else {
            console.log('No directions found.');
            if (path) {
                mapViewRef.current.Paths.remove(path);
                setPath(null);
            }
        }
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
        console.log("Night Mode Toggled:", !isNightMode); // Check if state is updating
    };

    const dropdownStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        border: '1px solid #ccc',
        maxHeight: '150px',
        overflowY: 'auto',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1001,
    };

    const listItemStyle = {
        padding: '8px',
        cursor: 'pointer',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1>Search Area</h1>
            <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1000, display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Start Point Input */}
                <div>
                    <label htmlFor="startPoint">Start Point:</label>
                    <input
                        type="text"
                        id="startPoint"
                        value={startPointQuery}
                        onChange={(e) => {
                            const query = e.target.value;
                            setStartPointQuery(query);
                            setSelectedStartPoint(null);
                            handleSearch(query, true);
                        }}
                    />
                    {startPointResults.length > 0 && (
                        <ul style={dropdownStyle}>
                            {startPointResults.map(space => (
                                <li key={space.id} style={listItemStyle} onClick={() => {
                                    setSelectedStartPoint(space);
                                    setStartPointQuery(space.name);
                                    setStartPointResults([]);
                                }}>
                                    {space.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedStartPoint && <p>Selected Start: {selectedStartPoint.name}</p>}
                </div>

                {/* End Point Input */}
                <div>
                    <label htmlFor="endPoint">End Point:</label>
                    <input
                        type="text"
                        id="endPoint"
                        value={endPointQuery}
                        onChange={(e) => {
                            const query = e.target.value;
                            setEndPointQuery(query);
                            setSelectedEndPoint(null);
                            handleSearch(query, false);
                        }}
                    />
                    {endPointResults.length > 0 && (
                        <ul style={dropdownStyle}>
                            {endPointResults.map(space => (
                                <li key={space.id} style={listItemStyle} onClick={() => {
                                    setSelectedEndPoint(space);
                                    setEndPointQuery(space.name);
                                    setEndPointResults([]);
                                }}>
                                    {space.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedEndPoint && <p>Selected End: {selectedEndPoint.name}</p>}
                </div>

                {/* Navigate Button */}
                {selectedStartPoint && selectedEndPoint && mapDataState && (
                    <button style={{ marginTop: '0', padding: '10px' }} onClick={handleNavigateButtonClick}>
                        Navigate
                    </button>
                )}

                {/* Night Mode Toggle */}
                <label style={{ marginLeft: '20px' }}>
                    Night Mode:
                    <input
                        type="checkbox"
                        checked={isNightMode}
                        onChange={toggleNightMode}
                        style={{ marginLeft: '5px' }}
                    />
                </label>
            </div>

            {path && <p style={{ color: 'green', marginTop: '10px' }}>Navigation path drawn.</p>}
            {path === null && selectedStartPoint && selectedEndPoint && <p style={{ color: 'orange', marginTop: '10px' }}>No navigation path drawn.</p>}

            {/* Map View */}
            <div style={{ width: '100%' }}>
                <BaseCampusMap ref={mapDiv} />
            </div>
        </div>
    );
};

export default NavigationDrawPage;