import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  {
    text: 'available',
    value: 'available',
  },
  {
    text: 'in use',
    value: 'in-use',
  },
  {
    text: 'out of order',
    value: 'out-of-order',
  },
];

const DropdownStatusSelection = () => (
    <Dropdown placeholder='Set availability' fluid selection options={options} />
);

export default DropdownStatusSelection;
