import React, { useState, useLayoutEffect, useRef } from "react";


const Cell = ({ formula, value, updateValue, handleCmdClick, cmdClicked }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(formula);
  const displayedValue = isEditing ? localValue : value;

  const firstUpdate = useRef(true);
  const inputRef = useRef();

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    };

    if (!firstUpdate.current && cmdClicked && isEditing) {
      // debugger
      setLocalValue(`${localValue}${cmdClicked}`);
      inputRef.current.focus();
    }
  }, [cmdClicked])


  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  const handleBlur = e => {
    setIsEditing(false);
    updateValue(localValue);
  }

  const handleOnClick = e => {
    if (e.ctrlKey || e.metaKey) {
      handleCmdClick(formula);
      e.preventDefault();
      // e.target.blur();
    }
  }

  return (
    <input
      type="text"
      value={displayedValue}
      onChange={e => setLocalValue(e.target.value)}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={(e) => handleKeyPress(e)}
      onMouseDown={handleOnClick}
      ref={inputRef}
    />
  )
}

export default Cell;
