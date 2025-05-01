import React, { useEffect, useRef, useState } from 'react';
import { getMapData, show3dMap, Navigation } from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/index.css';
import BaseCampusMap from '../BaseCampusMap';

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
    const [clickStep, setClickStep] = useState(0); // 0 = next click sets start, 1 = next click sets end


    useEffect(() => {
        const options = {
            key: 'mik_lFDgPjy2UrBv15bkB54580757',
            secret: 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c',
            mapId: '67dcbbef213bd1000bd6bc3b',
        };

        const init = async () => {
            try {
                const mapData = await getMapData(options);
                setMapDataState(mapData);

                if (mapDiv.current) {
                    const mapView = await show3dMap(mapDiv.current, mapData);
                    mapViewRef.current = mapView;

                    if (mapView.Navigation?.setup) {
                        await mapView.Navigation.setup();
                    }

                    mapData.getByType('space').forEach((space) => {
                        mapView.updateState(space, {
                            interactive: true,
                            hoverColor: 'red',
                        });
                    });

                    // ✅ Register click handler AFTER mapView is defined
                    mapView.on('click', async (event) => {
                        const { intersections } = event;
                        if (!intersections || intersections.length === 0) return;

                        const clickedObject = intersections.find(i => i.type === 'space');
                        if (!clickedObject) return;

                        const clickedSpace = clickedObject.object;

                        if (clickStep === 0) {
                            setSelectedStartPoint(clickedSpace);
                            setStartPointQuery(clickedSpace.name || '');
                            console.log('Selected start point via click:', clickedSpace.name);
                            setClickStep(1);
                        } else if (clickStep === 1) {
                            setSelectedEndPoint(clickedSpace);
                            setEndPointQuery(clickedSpace.name || '');
                            console.log('Selected end point via click:', clickedSpace.name);
                            setClickStep(0);

                            if (mapView.Navigation && selectedStartPoint && clickedSpace) {
                                try {
                                    const directions = await mapView.Navigation.getDirections(selectedStartPoint, clickedSpace);
                                    if (directions) {
                                        await mapView.Navigation.draw(directions, {
                                            pathOptions: {
                                                color: 'blue',
                                                nearRadius: 1,
                                                farRadius: 1,
                                            },
                                        });
                                        console.log('Navigation path drawn via map click.');
                                    } else {
                                        console.log('No directions found.');
                                    }
                                } catch (error) {
                                    console.error('Error getting directions via click:', error);
                                }
                            }
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Mappedin map:', error);
            }
        };


        init();

        return () => {
            if (mapViewRef.current?.destroy) {
                mapViewRef.current.destroy();
            }
        };
    }, []);


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

    return (
        <div>
            <h1>Draw Navigation</h1>
            <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1000 }}>
                {/* Start Point Input */}
                <div style={{ marginBottom: '10px' }}>
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
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            border: '1px solid #ccc',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: 1001,
                        }}>
                            {startPointResults.map(space => (
                                <li
                                    key={space.id}
                                    style={{ padding: '8px', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedStartPoint(space);
                                        setStartPointQuery(space.name);
                                        setStartPointResults([]);
                                    }}
                                >
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
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            border: '1px solid #ccc',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: 1001,
                        }}>
                            {endPointResults.map(space => (
                                <li
                                    key={space.id}
                                    style={{ padding: '8px', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedEndPoint(space);
                                        setEndPointQuery(space.name);
                                        setEndPointResults([]);
                                    }}
                                >
                                    {space.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedEndPoint && <p>Selected End: {selectedEndPoint.name}</p>}
                </div>

                {/* Navigate Button */}
                {selectedStartPoint && selectedEndPoint && mapDataState && (
                    <button
                        style={{ marginTop: '20px', padding: '10px' }}
                        onClick={async () => {
                            const mapView = mapViewRef.current;
                            const mapData = mapDataState;

                            if (!mapData || !mapView || !selectedStartPoint || !selectedEndPoint) {
                                console.log('Map data, map view, or selected points are not yet available.');
                                return;
                            }

                            console.log('Selected Start Point:', selectedStartPoint);
                            console.log('Selected End Point:', selectedEndPoint);

                            // Check if Navigation is available
                            if (mapView.Navigation) {
                                try {
                                    const directions = await mapView.Navigation.getDirections(selectedStartPoint, selectedEndPoint);

                                    if (directions) {
                                        await mapView.Navigation.draw(directions, {
                                            pathOptions: {
                                                color: 'blue',
                                                nearRadius: 1,
                                                farRadius: 1,
                                            },
                                        });
                                        console.log('Navigation path drawn.');
                                    } else {
                                        console.log('Directions not found for the selected points.');
                                    }
                                } catch (error) {
                                    console.error('Error getting directions:', error);
                                }
                            } else {
                                console.warn('Navigation is not available on mapView.');
                            }
                        }}
                    >
                        Navigate
                    </button>

                )}
            </div>

            {/* Map View */}
            <div>
                <BaseCampusMap ref={mapDiv} />
            </div>
        </div>
    );
};

export default NavigationDrawPage;