import React  from 'react'
import { components } from 'react-select'
import SearchIcon from '@material-ui/icons/Search'
const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && (
            <SearchIcon
              color="disabled"
              style={{
                position: 'absolute',
                top: 7,
                width: 20,
                height: 20,
                marginLeft: '-2px',
              }}
            />
          )}
          {children}
        </components.ValueContainer>
      )
    )
  }

  export default ValueContainer