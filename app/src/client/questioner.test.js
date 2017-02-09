import React from 'react';
import Questioner, {DEFAULT_TEXT, CLICKED_TEXT} from './questioner.jsx';
import {shallow} from 'enzyme';

// describe('The questioner component', () => {
//     it('the questioner should show text', () => {
//         const app  = shallow(<Questioner/>);
//         expect(app.contains(<div>This is from the questioner component!</div>)).toBe(true);
//     })
// })

describe('The questioner component', () => {
    let questioner;
    beforeEach(() => {
        questioner  = shallow(<Questioner/>);
    })

    it ('should change status text on click', () => {
        questioner.simulate('click');
        expect(questioner.text()).toBe(CLICKED_TEXT);
        questioner.simulate('click');
        expect(questioner.text()).toBe(DEFAULT_TEXT);
    })
})