import React from 'react';

export default function RightClickItem({ item, isNone, index, handleClick }) {
    if (item) {
        return (
            <button
                key={item.buttonText || index}
                className={`menu-item${!isNone ? ' none' : ''}`}
                onClick={() => handleClick(item)}
            >
                {item.buttonText.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
            </button>
        );
    }
};
