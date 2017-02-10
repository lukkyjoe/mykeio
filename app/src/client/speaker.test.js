import React from 'react';
import Speaker, {DEFAULT_TEXT, CLICKED_TEXT} from './speaker.jsx';
import {shallow} from 'enzyme';

describe('The speaker component', () => {
    let speaker;
    beforeEach(() => {
        speaker = shallow(<Speaker/>);
    })

    it ('should change status text on click', () => {
        speaker.simulate('click');
        expect(speaker.text()).toBe(CLICKED_TEXT);
        speaker.simulate('click');
        expect(speaker.text()).toBe(DEFAULT_TEXT);
    })
})