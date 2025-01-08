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

export function buildIncomes(data) {
    const currentYear = new Date("2024/12/30").getFullYear()
    const currentMonth = new Date("2024/12/30").getMonth()
    const currentData = data.filter(item => item['Data'].split("/")[2] === currentYear.toString())
    let incomes = []

    for (let month = 0; month <= currentMonth; month++) {
        const dataOfThisMonth = currentData.filter(item => parseInt(item['Data'].split("/")[1]) - 1 === parseInt(month))
        let totalValue = dataOfThisMonth.reduce((sum, value) => parseFloat(value["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) > 0 ? sum + parseFloat(value["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) : sum, 0);
        incomes.push({
            month: month + 1,
            value: totalValue
        })
    }

    return incomes
}