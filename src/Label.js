import React from "react";


const Label = ({ label }) => {
  const isColumn = label[0] !== "X";

  return (
    <div>
      {isColumn ? label[0] : label.slice(1)}
    </div>
  )
}

export default Label;
