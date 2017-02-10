import React from 'react';
import Queue from './queue.jsx';
import {shallow} from 'enzyme';

const questions = ["What does recursion mean?", "What's the meaning of Stonehenge?", "What's danker than dank?"
];

describe('The queue component', () => {
    let queue;
    beforeEach(() => {
        queue = shallow(<Queue/>);
    })

    it ('should reflect the correct length of questions', () => {

    })
})