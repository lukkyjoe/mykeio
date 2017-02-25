import React from 'react';


export default class ChoicesListHeader extends React.Component {
  render() {
    return (
        <thead>
          <tr>            
            <th>Items</th>
            <th>Correct Answer?</th>
          </tr>
        </thead>
    );
  }
}