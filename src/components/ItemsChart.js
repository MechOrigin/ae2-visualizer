import React from 'react';
import './ItemsChart.css'; // Import styling

const ItemsChart = ({ items = [] }) => {
    // Handle empty or missing data
    if (!items || items.length === 0) {
        return <p>No items to display.</p>;
    }

    // Utility function to format numbers
    const formatNumber = (num) => {
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num;
    };

    // Map of special cases where texture names differ from item names
    const specialCases = {
        'block of coal': 'coal_block',
        'block of iron': 'iron_block',
        'block of gold': 'gold_block',
        'block of diamond': 'diamond_block',
        'nether quartz': 'quartz',
        'charged certus quartz crystal': 'certus_quartz_crystal_charged',
    };

    return (
        <div>
            <h2>Items</h2>
            <div className="item-grid">
                {items.map((item, index) => {
                    const rawName = item.displayName.toLowerCase();

                    // Handle special cases
                    const textureName = specialCases[rawName]
                        ? specialCases[rawName]
                        : rawName
                              .replace(/\s+/g, '_') // Replace spaces with underscores
                              .replace(/[^a-z0-9_]/g, ''); // Remove invalid characters

                    const iconPath = `/assets/icons/${textureName}.png`;

                    return (
                        <div
                            key={index}
                            className="item-icon"
                            style={{
                                backgroundImage: `url(${iconPath})`, // No fallback icon
                            }}
                            title={item.displayName}
                        >
                            <span className="item-amount">{formatNumber(item.amount)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ItemsChart;
