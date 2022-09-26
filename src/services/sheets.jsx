import { parseMonthToInt } from "./utils" 

export function filterByDate(qMonth, qYear, sheets) {
    return sheets.filter(item => {
        const [day, month, year] = item["Data"].split("/")

        if (parseInt(month) === parseMonthToInt(qMonth) && year === qYear) {
            return item
        }
    })
}

export function calculateCashFlow(data) {
    return data.reduce((previousValue, item) => previousValue + parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")), 0).toFixed(2)
}

export function calculateExpenses(data) {
    return data.reduce((previousValue, item) => previousValue + (parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) < 0 ? parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) : 0), 0).toFixed(2)
}

export function calculateProfit(data) {
    return data.reduce((previousValue, item) => previousValue + (parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) > 0 ? parseFloat(item["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) : 0), 0).toFixed(2)
}