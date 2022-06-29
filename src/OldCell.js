import React, { useState } from "react";


const Cell = ({ formula, value, updateValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const displayedValue = isEditing ? formula : value;

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <input
      type="text"
      value={displayedValue}
      onChange={e => updateValue(e.target.value)}
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onKeyDown={(e) => handleKeyPress(e)}
    />
  )
}

export default Cell;
