import React from 'react';

const EnergyGauges = ({ energy }) => {
    return (
        <div>
            <h2>Energy</h2>
            <p><strong>Stored:</strong> {energy.stored} AE</p>
            <p><strong>Max:</strong> {energy.max} AE</p>
            <p><strong>Usage:</strong> {energy.usage} AE</p>
        </div>
    );
};

export default EnergyGauges;
