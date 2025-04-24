import React from 'react';
import CampusMap from '../../components/CampusMap';

function CampusPage() {
    const mapId = '67dcbbef213bd1000bd6bc3b';
    const apiKey = 'mik_lFDgPjy2UrBv15bkB54580757';
    const apiSecret = 'mis_Tm3GTCVTOd8IrUHgPlxS0FSj0rJriGrQvMDKuEEsAt983be100c';

    return (
        <div style={{ width: '100%', height: '500px' }}> {/* ADD THIS STYLE */}
            <h1>Campus Map</h1>
            <CampusMap apiKey={apiKey} apiSecret={apiSecret} mapId={mapId} />
        </div>
    );
}

export default CampusPage;