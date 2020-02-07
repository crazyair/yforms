import React from 'react';
import { searchSelect, calculateStrLength, oneLineItemStyle, getFieldKeyValue } from '../utils';

const dom = (
    <span>
        <span>
            <span>12</span>
        </span>
        <span>
            <span>23</span>
        </span>
        <span>34</span>
        45
    </span>
);

describe('Utils test', () => {
    test('test Utils', () => {
        searchSelect.filterOption('1', dom);
        expect(calculateStrLength()).toBe(0);
        expect(calculateStrLength('我')).toBe(2);
        expect(calculateStrLength(123)).toBe(3);
        expect(oneLineItemStyle()).toEqual([]);
        expect(oneLineItemStyle(['50%', 8, '50%'])).toEqual([
            { display: 'inline-block', width: 'calc(50% - 4px)' },
            { display: 'inline-block', width: '8px' },
            { display: 'inline-block', width: 'calc(50% - 4px)' },
        ]);
        expect(getFieldKeyValue({ id: 1 }, 1, 'id')).toBe(1);
        expect(getFieldKeyValue({ id: 1 }, 1, () => undefined)).toBe(1);
    });
});
