import React from 'react'

const FindCountries = ({ find, handleInputChange }) => {
    return (
      <div>
        find countries <input value={find} onChange={handleInputChange}/>
      </div>
    )
}
  
export default FindCountries