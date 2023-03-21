import React  from 'react'
import { components } from 'react-select'
import Tooltip from '@atlaskit/tooltip';
const NoOptionsMessage = props => {
    return (
      <Tooltip content="Custom NoOptionsMessage Component">
        <components.NoOptionsMessage {...props} />
      </Tooltip>
    );
  };

  export default NoOptionsMessage
