import React from 'react';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-around', 
  flexWrap: 'wrap',
};

export default class ChoicesListHeader extends React.Component {
  render() {
    return (
        <thead>
          <tr style={headerStyle}>            
            <th>Items</th>
            <th>Edit / Delete </th>
            <th>Correct Answer?</th>
          </tr>
        </thead>
    );
  }
}