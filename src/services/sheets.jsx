import { parseMonthToInt } from "./utils" 

const BASE_URL = "https://opensheet.elk.sh/"
const SHEET_ID = "1E85UsRGMPkAlh1AaxXHZIlhHDl4lKMoE8IAJCSyQXdw"
const TAB_NAME = "Página1"

export async function fetchAll() {
    return fetch(`${BASE_URL}${SHEET_ID}/${TAB_NAME}`)
    .then(res => (
        res.json()
            .then(data => data)
    ))
}

export async function fetchByDate(qMonth, qYear) {
    return fetch(`${BASE_URL}${SHEET_ID}/${TAB_NAME}`)
        .then(res => (
            res.json()
                .then(data => data.filter(item => {
                    const [day, month, year] = item["Data"].split("/")
                    
                    if (parseInt(month) === parseMonthToInt(qMonth) && year === qYear) {
                        return item
                    }
                })
        )))
}