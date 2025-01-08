import { useEffect, useState } from "react";

import { parseMonthToString } from "../services/utils";

export function useMonths() {
  const [months, setMonths] = useState([])

  useEffect(() => {
    const today = new Date();
    let newMonths = []

    let month = 4;
    let year = 2020;

    while (year <= today.getFullYear()) {
      let months = [];

      while (month <= 12) {
        if (year === today.getFullYear() && month > today.getMonth() + 1) {
          break;
        }
        months.push(parseMonthToString(month))
        month++
      }
      newMonths.push({
        "year": year,
        "months": months
      })
      month = 1
      year++
    }

    setMonths(newMonths.sort((a, b) => parseInt(b.year) - parseInt(a.year)))
  }, [])

  return { months }
}