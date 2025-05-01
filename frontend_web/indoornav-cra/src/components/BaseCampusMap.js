import React from 'react';

const BaseCampusMap = React.forwardRef((props, ref) => (
    <div ref={ref} style={{ width: '100%', height: 'auto', padding: '20px' }}> {/* Added padding */}
        <img
            src="/images/campus.jpg"
            alt="CIT University Campus Map"
            style={{ display: 'block', width: '80%', height: 'auto', margin: '0 auto' }}
        />
    </div>
));

export default BaseCampusMap;