import React from "react";
import "../styles/toggle.css";

const ToggleSwitch = (props) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={props.Name}
        id={props.Name}
        checked={props.checked}
        onChange={props.handleChecked}
      />
      <label className="toggle-switch-label" htmlFor={props.Name}>
        <span
          className="toggle-switch-inner"
          data-yes={props.location}
          data-no={props.location}
        />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
