import React from 'react';

const ItemsChart = ({ items = [] }) => {
    // Handle empty or missing data
    if (!items || items.length === 0) {
        return <p>No items to display.</p>;
    }

    return (
        <div>
            <h2>Items</h2>
            {items.map((item, index) => (
                <p key={index}>
                    <strong>{item.displayName}:</strong> {item.amount}
                </p>
            ))}
        </div>
    );
};

export default ItemsChart;
