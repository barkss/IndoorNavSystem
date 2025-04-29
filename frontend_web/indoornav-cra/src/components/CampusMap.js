import React, { useEffect, useState } from 'react';
import { MapView, useMapData } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';

function CampusMap({ apiKey, apiSecret, mapId }) {
    const { isLoading, error, mapData } = useMapData({
        key: apiKey,
        secret: apiSecret,
        mapId: mapId,
    });

    const [mapView, setMapView] = useState(null);

    // When MapView is created
    const handleMapViewCreated = (view) => {
        setMapView(view);
    };

    // Click event to start navigation
    const handleMapClick = async (event) => {
        // Get the clicked coordinate
        const clickedLocation = event.coordinate;

        // Find the destination (e.g., Gymnasium) from map data
        const destination = mapData.getByType('space').find(s => s.name === 'Gymnasium');

        // If destination found, get directions
        if (destination) {
            const directions = mapData.getDirections(clickedLocation, destination);

            if (directions) {
                // Draw the navigation path from clicked location to destination
                mapView.Navigation.draw(directions, {
                    pathOptions: {
                        nearRadius: 1,
                        farRadius: 1,
                        displayArrowsOnPath: true,
                        animateArrowsOnPath: true,
                        accentColor: '#ffffff',  // White color for the path
                    },
                    markerOptions: {
                        departureColor: '#228b22',  // Green for start point
                        destinationColor: '#ff6347', // Red for end point
                    },
                    createMarkers: {
                        departure: (instruction) => {
                            const marker = mapView.Markers.add(instruction.coordinate, '<div>Departure</div>');
                            return marker;
                        },
                        destination: (instruction) => {
                            const marker = mapView.Markers.add(instruction.coordinate, '<div>Destination</div>');
                            return marker;
                        },
                        connection: (instruction) => {
                            const marker = mapView.Markers.add(instruction.coordinate, '<div>Connection</div>');
                            return marker;
                        },
                    },
                });
            }
        }
    };

    // Default navigation from predefined spaces (Cafeteria -> Gymnasium)
    useEffect(() => {
        if (!mapView || !mapData) return;

        const firstSpace = mapData.getByType('space').find(s => s.name === 'Cafeteria');
        const secondSpace = mapData.getByType('space').find(s => s.name === 'Gymnasium');

        if (firstSpace && secondSpace) {
            const directions = mapData.getDirections(firstSpace, secondSpace);

            if (directions) {
                // Draw the path on the map
                mapView.Navigation.draw(directions, {
                    pathOptions: {
                        displayArrowsOnPath: true,
                        animateArrowsOnPath: true,
                        accentColor: '#ffffff',
                    },
                    markerOptions: {
                        departureColor: '#228b22',  // Green for departure
                        destinationColor: '#ff6347', // Red for destination
                    },
                });
            }
        }

        // Set up the click listener to navigate
        mapView.on('click', handleMapClick);

    }, [mapView, mapData]);

    if (isLoading) {
        return <div>Loading Campus Map...</div>;
    }

    if (error) {
        return <div>Error Loading Campus Map: {error.message}</div>;
    }

    return mapData ? (
        <div style={{ width: '100%', height: '500px' }}>
            <MapView
                mapData={mapData}
                onMapViewCreated={handleMapViewCreated}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    ) : null;
}

export default CampusMap;
