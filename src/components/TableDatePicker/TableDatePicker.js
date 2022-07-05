import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker({ transferDateFromCalender }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    transferDateFromCalender(date);
  }, [date]);

  return (
    <>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </>
  );
}
