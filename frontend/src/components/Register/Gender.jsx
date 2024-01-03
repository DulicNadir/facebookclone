import React from "react"
import "./styles.css"

const Gender = ({ handleRegisterChange, genderMessage }) => {
  return (
    <div className="regGrid" style={{ marginBottom: "30px" }}>
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          value="male"
          id="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          id="female"
          onChange={handleRegisterChange}
        />
      </label>
      {genderMessage && <div className="inputErrorReg">{genderMessage}</div>}
    </div>
  )
}

export default Gender
