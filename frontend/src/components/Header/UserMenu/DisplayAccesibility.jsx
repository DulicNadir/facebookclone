import React from "react";

const DisplayAccesibility = ({ setVisible }) => {
  return (
    <div className="absoluteWrap">
      <div className="absoluteWrapHeader">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Display & accesibility
      </div>
      <div className="mmenuMain">
        <div className="smallCircle darkIcon">
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenuCol">
          <span className="mmenuSpan1">Dark mode</span>
          <span className="mmenuSpan2">
            Adjust the apperance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <div className="mmenuMain">
        <div className="smallCircle darkIcon">
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenuCol">
          <span className="mmenuSpan1">Compact mode</span>
          <span className="mmenuSpan2">
            Make your font size smaller to save space on your screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <div className="mmenuItem hover3">
        <div className="smallCircle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DisplayAccesibility;
