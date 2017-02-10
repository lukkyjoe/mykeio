import React from 'react';
import Queue from './queue.jsx';
import Question from './question.jsx';
import {shallow, mount} from 'enzyme';

const testQuestions = [{username: 'JOSEPH', question: 'What does recursion mean?'},
 {username: 'Jonathan', question: "What's the meaning of Stonehenge?"},
{username: 'Sawyer' , question: "What's danker than dank?"}
];

describe('The queue component', () => {
    it ('should hold correct number of questions', () => {
        const queue = shallow(<Queue questions={testQuestions} />);
        expect(queue.find(Question)).to.have.length(3);
    })
})