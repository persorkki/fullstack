import React from 'react'

const Filter = ({ newFilter, handleInputChange, setNewFilter }) => {
    return (
      <div>filter shown
        <input value={newFilter} onChange={(event) => handleInputChange(event, setNewFilter)} />
      </div>
    )
}
export default Filter