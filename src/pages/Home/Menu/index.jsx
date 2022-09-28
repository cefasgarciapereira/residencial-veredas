import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom"

import { parseMonthToString } from "../../../services/utils";

import classes from "./index.module.css";

export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [actives, setActives] = useState([]);

    useEffect(() => {
        const today = new Date();
        let newMenu = []

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
            newMenu.push({
                "year": year,
                "months": months
            })
            month = 1
            year++
        }
        setMenu(newMenu)
    }, [])

    function toggleCaret(year) {
        if (actives.includes(year)) {
            setActives(actives.filter(item => item !== year))
        } else {
            setActives([...actives, year])
        }
    }

    return (
        <ul id="myUL">
            {menu.map((item, index) =>
                <li key={item.year}>
                    <span
                        className={classes["caret"]}
                        onClick={() => toggleCaret(item.year)}>
                        {item.year}
                    </span>
                    <ul
                        className={`${actives.includes(item.year) ? classes["active"] : classes["nested"]}`}
                        key={`${item.year}${index}`}
                    >
                        {item.months.map(month =>
                            <li key={`${item.year}${month}`}>
                                <Link to={`/${item.year}/${month}`}>{month}</Link>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>
    )

}