import React from 'react';

const FluidsChart = ({ fluids = [] }) => {
    // Handle empty or missing data
    if (!fluids || fluids.length === 0) {
        return <p>No fluids to display.</p>;
    }

    return (
        <div>
            <h2>Fluids</h2>
            {fluids.map((fluid, index) => (
                <p key={index}>
                    <strong>{fluid.name}:</strong> {fluid.amount} mB
                </p>
            ))}
        </div>
    );
};

export default FluidsChart;
