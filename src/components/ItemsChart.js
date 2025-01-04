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

    return (
        <div>
            <h2>Items</h2>
            <div className="item-grid">
            {items.map((item, index) => {
                const [mod, name] = item.displayName.toLowerCase().split(':');
                const safeMod = mod || 'unknown';
                const safeName = name || 'unknown';
                const formattedName = safeName.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                const iconPath = `/assets/icons/${safeMod}/${formattedName}.png`;
                const fallbackIcon = '/assets/icons/question_mark.png';

                console.log('Icon Path:', iconPath); // Debugging

                return (
                    <div
                        key={index}
                        className="item-icon"
                        style={{ backgroundImage: `url(${iconPath}), url(${fallbackIcon})` }}
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
