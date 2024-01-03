import React from "react";

const HelpSupport = ({ setVisible }) => {
  return (
    <div className="wrap">
      <div className="wrapHeader">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Help & support
      </div>
      <div className="mmenuItem hover3">
        <div className="smallCircle">
          <i className="help_center_icon"></i>
        </div>
        <span>Help center</span>
      </div>
      <div className="mmenuItem hover3">
        <div className="smallCircle">
          <i className="email_icon"></i>
        </div>
        <span>Support inbox</span>
      </div>
      <div className="mmenuItem hover3">
        <div className="smallCircle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a problem</span>
      </div>
    </div>
  );
};

export default HelpSupport;
