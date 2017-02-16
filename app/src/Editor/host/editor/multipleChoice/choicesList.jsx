import React from 'react';
import ChoicesListHeader from './choicesListHeader.jsx';
import _ from 'lodash';
import ChoicesListItem from './choicesListItem.jsx';


export default class ChoicesList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'choices')
    return _.map(this.props.choices, (choice, index) => <ChoicesListItem key={index} {...choice} {...props}/>
    )
  }
  
  render() {
    console.log(this.props);
    return (
      <table>
        <ChoicesListHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    )
  }
}