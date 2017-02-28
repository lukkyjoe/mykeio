import React from 'react';
import ChoicesListHeader from './choicesListHeader.jsx';
import _ from 'lodash';
import ChoicesListItem from './choicesListItem.jsx';

const tableStyle = {
  display: 'flex', 
  flexDirection: 'column', 
}

const choiceListStyle = {
  display: 'flex',
  justifyContent: 'space-around', 
  flexWrap: 'wrap',
  flexDirection: 'column',
};


export default class ChoicesList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'choices');
    return _.map(this.props.choices, (choice, index) => <ChoicesListItem key={index} {...choice} {...props}/>
    );
  }
   
  render() {
    return (
      <table style={tableStyle}>
        <ChoicesListHeader />
        <tbody style={choiceListStyle}>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}