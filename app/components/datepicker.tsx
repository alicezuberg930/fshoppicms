"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full" />
    );
};

export default CustomDatePicker