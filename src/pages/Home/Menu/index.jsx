import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import { parseMonthToString } from "../../../services/utils";

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
        setMenu(newMenu.reverse())
        setActives([today.getFullYear()])
    }, [])

    function toggleCaret(year) {
        if (actives.includes(year)) {
            setActives(actives.filter(item => item !== year))
        } else {
            setActives([...actives, year])
        }
    }

    return (
        <div className="space-y-2">
            {menu.map((item) => (
                <div key={item.year} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => toggleCaret(item.year)}
                    >
                        <span className="font-medium text-gray-700">{item.year}</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${actives.includes(item.year) ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`${actives.includes(item.year) ? 'block' : 'hidden'} p-3 bg-white`}>
                        <div className="grid grid-cols-3 gap-2">
                            {item.months.map(month => (
                                <Link
                                    key={`${item.year}${month}`}
                                    to={`/${item.year}/${month}`}
                                    className="px-3 py-2 text-sm text-center text-blue-600 hover:bg-blue-50 rounded-md transition-colors capitalize"
                                >
                                    {month}
                                </Link>
                            ))}
                        </div>
                        <a
                            href={`/relatorio/${item.year}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimir relatório de {item.year}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}