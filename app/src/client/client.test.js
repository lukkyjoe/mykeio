import React from 'react';
import Client, {DEFAULT_TEXT, CLICKED_TEXT} from './client.jsx';
import {shallow} from 'enzyme';

describe('The client component', () => {
    let client;
    beforeEach(() => {
        client = shallow(<Client/>);
    })

    it ('should change status text on click', () => {
        client.simulate('click');
        expect(client.text()).toBe(CLICKED_TEXT);
        client.simulate('click');
        expect(client.text()).toBe(DEFAULT_TEXT);
    })
})