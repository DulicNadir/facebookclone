import React from "react";

const MainMenuItem = ({name,description,icon}) => {
  return (
    <div className="mainMenuItem hover1">
      <img src={`../../left/${icon}.png`} alt="campus" />
      <div className="mainMenuCol">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default MainMenuItem;
