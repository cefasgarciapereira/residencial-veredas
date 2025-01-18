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
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
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

export function buildOutcomes(data) {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentData = data.filter(item => item['Data'].split("/")[2] === currentYear.toString())
    let outcomes = []

    for (let month = 0; month <= currentMonth; month++) {
        const dataOfThisMonth = currentData.filter(item => parseInt(item['Data'].split("/")[1]) - 1 === parseInt(month))
        let totalValue = dataOfThisMonth.reduce((sum, value) => parseFloat(value["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) < 0 ? sum + parseFloat(value["Valor"].replace("R$ ", "").replace(".", "").replace(",", ".")) : sum, 0);
        outcomes.push({
            month: month + 1,
            value: totalValue
        })
    }

    return outcomes
}

export function buildCashFlow(data) {
    const incomes = buildIncomes(data)
    const outcomes = buildOutcomes(data)
    const currentMonth = new Date().getMonth()
    let cashflow = []

    for (let month = 0; month <= currentMonth; month++) {
        cashflow.push({
            month: month + 1,
            value: incomes.find(income => income.month === month + 1).value + outcomes.find(outcome => outcome.month === month + 1).value
        })
    }

    return cashflow
}

export function buildBalances(data) {
    const thisYear = new Date().getFullYear()
    const result = []

    for (let currentYear = 2020; currentYear <= thisYear; currentYear++) {
        for (let currentMonth = 1; currentMonth <= 12; currentMonth++) {
            const date = `${currentMonth}/${currentYear}`

            const filteredData = data.filter(item => {
                const [day, month, year] = item['Data'].split("/")

                if (parseInt(month) <= currentMonth && year <= currentYear) {
                    return item
                }
            })

            if (filteredData.length > 0) {
                result.push({
                    date: date,
                    value: parseFloat(calculateCashFlow(filteredData))
                })
            }
        }
    }

    return result

}