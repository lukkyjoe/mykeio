import React from 'react';
import Speaker, {DEFAULT_TEXT, CLICKED_TEXT} from './speaker.jsx';
import {shallow} from 'enzyme';

// describe('The speaker component', () => {
//     it('the speaker should show text', () => {
//         const app  = shallow(<speaker/>);
//         expect(app.contains(<div>This is from the speaker component!</div>)).toBe(true);
//     })
// })

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