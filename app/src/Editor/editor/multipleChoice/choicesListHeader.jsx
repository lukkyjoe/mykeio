import React from 'react';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between', 
  width: '100%'
};

export default class ChoicesListHeader extends React.Component {
  render() {
    return (
        <thead>
          <tr style={headerStyle}>            
            <th>Items</th>
            <th>Correct?</th>
          </tr>
        </thead>
    );
  }
}