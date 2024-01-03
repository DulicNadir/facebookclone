import React from "react"
import "./styles.css"

const DateOfBirth = ({
  bDay,
  handleRegisterChange,
  days,
  bMonth,
  months,
  bYear,
  years,
  dateMessage,
}) => {
  return (
    <div
      className="regGrid"
      style={{ marginBottom: `${dateMessage && "70px"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((mon, i) => (
          <option value={mon} key={i}>
            {mon}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateMessage && <div className="inputErrorReg">{dateMessage}</div>}
    </div>
  )
}

export default DateOfBirth
