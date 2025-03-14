import React from "react";

const ConfigurationTab = ({ thresholds, setThresholds }) => {
  const handleChange = (event, resource) => {
    setThresholds({ ...thresholds, [resource]: event.target.value });
  };

  return (
    <div>
      <h2>Set Thresholds</h2>
      {Object.keys(thresholds).map((resource) => (
        <div key={resource}>
          <label>{resource} Threshold:</label>
          <input
            type="number"
            value={thresholds[resource]}
            onChange={(e) => handleChange(e, resource)}
          />
        </div>
      ))}
    </div>
  );
};

export default ConfigurationTab;
