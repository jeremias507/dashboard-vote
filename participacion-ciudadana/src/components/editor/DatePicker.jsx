import React, { useState } from "react";

const DatePicker = ({ onDateChange, selectedDate }) => {
  const [date, setDate] = useState(selectedDate || "");

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="relative">
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="p-2 border border-gray-300 rounded-md bg-white text-black"
      />
    </div>
  );
};

export default DatePicker;
